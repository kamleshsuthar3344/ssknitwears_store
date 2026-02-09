
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const SELLER_EMAIL = 'ssknitwears14@gmail.com';
const SELLER_PASSWORD = 'ssknitwears14@123';

test('E-commerce Full Flow: Seller Add Product -> User Checkout -> Seller Verify', async ({ browser }) => {
  // 1. Seller Login & Add Product
  const sellerContext = await browser.newContext();
  const sellerPage = await sellerContext.newPage();
  
  console.log('--- Step 1: Seller Login ---');
  await sellerPage.goto(`${BASE_URL}/seller/login`);
  await sellerPage.fill('input[name="email"]', SELLER_EMAIL);
  await sellerPage.fill('input[name="password"]', SELLER_PASSWORD);
  await sellerPage.click('button[type="submit"]');
  
  // Handle potential OTP bypass if existing
  try {
      await sellerPage.waitForURL('**/seller/verify-otp', { timeout: 3000 });
      console.log('OTP Page detected.');
      await sellerPage.fill('input[name="otp"]', '000000');
      await sellerPage.click('button[type="submit"]');
  } catch (e) {
      console.log('No OTP page or verify skipped.');
  }

  await sellerPage.waitForURL('**/seller/dashboard');
  console.log('Seller logged in.');

  console.log('--- Step 2: Seller Add Product ---');
  // Navigate to add product (adjust selector as needed)
  // Trying to find a link or button to add product. 
  // If URL is known, goto is safer.
  await sellerPage.goto(`${BASE_URL}/seller/products/add`); 
  
  const productName = `Playwright Sweater ${Date.now()}`;
  await sellerPage.fill('input[name="name"]', productName);
  await sellerPage.fill('textarea[name="description"]', 'Automated test product');
  await sellerPage.fill('input[name="price"]', '3000');
  
  // Selects might be tricky without specific IDs, using generic locators
  await sellerPage.selectOption('select[name="category"]', { label: 'Women' }).catch(() => sellerPage.fill('input[name="category"]', 'Women'));
  await sellerPage.selectOption('select[name="season"]', { label: 'Winter' }).catch(() => sellerPage.fill('input[name="season"]', 'Winter'));

  // Variants
  await sellerPage.fill('input[name="variants[0][color]"]', 'Red').catch(() => {}); // Adjust if structure differs
  // If complex form, might need more specific selectors. 
  // Assuming a simple implementation based on previous context.
  
  // Check if there is a 'Add Product' submit button
  await sellerPage.click('button[type="submit"]');
  
  // Wait for success
  await sellerPage.waitForURL('**/seller/products');
  console.log(`Product "${productName}" added.`);

  // 2. User Register & Checkout
  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();
  const userEmail = `testuser${Date.now()}@example.com`;

  console.log('--- Step 3: User Register ---');
  await userPage.goto(`${BASE_URL}/login`); 
  await userPage.click('text=Register'); // Assuming link to register
  
  await userPage.fill('input[name="name"]', 'Test User');
  await userPage.fill('input[name="email"]', userEmail);
  await userPage.fill('input[name="password"]', 'password');
  await userPage.fill('input[name="password_confirmation"]', 'password');
  await userPage.click('button[type="submit"]');
  
  await userPage.waitForURL(`${BASE_URL}/`); // Home or Dashboard
  console.log(`User registered: ${userEmail}`);

  console.log('--- Step 4: User Buy Product ---');
  await userPage.goto(`${BASE_URL}/shop`);
  
  // Search or filter for the product
  // For simplicity, just find text
  await userPage.locator(`text=${productName}`).first().click();
  
  // Product Detail Page
  await userPage.click('button:has-text("Add to Cart")');
  
  // Cart / Checkout
  await userPage.goto(`${BASE_URL}/cart`);
  await userPage.click('button:has-text("Checkout")');
  
  // Checkout Form
  await userPage.fill('input[name="address"]', '123 Test St');
  await userPage.fill('input[name="city"]', 'Test City');
  await userPage.fill('input[name="zip"]', '12345');
  await userPage.click('button:has-text("Place Order")');
  
  await userPage.waitForURL('**/order-success'); // Or similar
  const orderId = await userPage.locator('.order-id').innerText().catch(() => 'Unknown');
  console.log(`Order placed. ID: ${orderId}`);

  // 3. Seller Verify
  console.log('--- Step 5: Seller Verify Order ---');
  await sellerPage.goto(`${BASE_URL}/seller/orders`);
  await expect(sellerPage.locator('body')).toContainText(productName);
  console.log('Order verified in Seller Dashboard.');

  await sellerPage.close();
  await userPage.close();
});
