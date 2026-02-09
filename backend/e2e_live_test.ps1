# e2e_live_test.ps1
$baseUrl = "http://127.0.0.1:8000/api"

function Test-Step {
    param($Name, $Action)
    Write-Host "[$Name]..." -NoNewline
    try {
        $res = & $Action
        Write-Host " OK" -ForegroundColor Green
        return $res
    }
    catch {
        Write-Host " FAILED" -ForegroundColor Red
        Write-Host $_.Exception.Message
        
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "DEBUG RESPONSE: $responseBody" -ForegroundColor Yellow
        }
        exit 1
    }
}

# 1. Login Seller (2-step)
$sellerEmail = "ssknitwears14@gmail.com"
Test-Step "Login Seller Request ($sellerEmail)" {
    $headers = @{ Accept = "application/json" }
    $body = @{ email = $sellerEmail; password = "ssknitwears14@123" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/seller/login" -Method Post -Headers $headers -Body $body -ContentType "application/json"
} | Out-Null

$sellerAuth = Test-Step "Verify OTP (bypass)" {
    $headers = @{ Accept = "application/json" }
    $body = @{ email = $sellerEmail; otp = "000000" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/seller/verify-otp" -Method Post -Headers $headers -Body $body -ContentType "application/json"
}

$sellerToken = $sellerAuth.token
if (-not $sellerToken) {
    Write-Host "FAILED: No token received in verify-otp response" -ForegroundColor Red
    exit 1
}
Write-Host "  -> Seller Token: $($sellerToken.Substring(0, 10))..." -ForegroundColor Gray

# 2. Add Product
$product = Test-Step "Add Product (Live Sweater)" {
    $headers = @{ 
        Authorization = "Bearer $sellerToken";
        Accept        = "application/json"
    }
    $body = @{
        name = "Live Sweater $(Get-Random)"; description = "Cozy"; price = 2000; category = "Women"; season = "Winter";
        variants = @( @{ color = "Blue"; size = "S"; stock = 50; price = 2000 } )
        image_urls = @("https://placehold.co/600x400")
    }
    
    $jsonBody = $body | ConvertTo-Json -Depth 3
    
    Invoke-RestMethod -Uri "$baseUrl/seller/products" -Method Post -Headers $headers -Body $jsonBody -ContentType "application/json"
}
$productId = $product.id
Write-Host "  -> Created Product ID: $productId" -ForegroundColor Gray

# 3. Register Customer
$userEmail = "user_live_$(Get-Random)@test.com"
$user = Test-Step "Register Customer ($userEmail)" {
    $headers = @{ Accept = "application/json" }
    $body = @{
        name                  = "Live Customer"; 
        email                 = $userEmail; 
        password              = "password"; 
        password_confirmation = "password";
        mobile                = "1234567890" 
    } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/register" -Method Post -Headers $headers -Body $body -ContentType "application/json"
}
$userToken = $user.token
Write-Host "  -> User Token: $($userToken.Substring(0, 10))..." -ForegroundColor Gray

# 4. Fetch Product/Variant
$fetchedProduct = Test-Step "Fetch Product Details" {
    Invoke-RestMethod -Uri "$baseUrl/products/$productId" -Method Get
}
$variantId = $null
if ($fetchedProduct.variants.Count -gt 0) {
    $variantId = $fetchedProduct.variants[0].id
    Write-Host "  -> Found Variant ID: $variantId" -ForegroundColor Gray
}
else {
    Write-Host "  -> No variants found, proceeding without variant_id" -ForegroundColor Yellow
}

# 5. Place Order
$order = Test-Step "Place Order" {
    $headers = @{ 
        Authorization = "Bearer $userToken";
        Accept        = "application/json"
    }
    
    $item = @{ 
        product_id = $productId; quantity = 1; price = 2000; 
        color = "Blue"; size = "S" 
    }
    if ($variantId) { $item.variant_id = $variantId }

    $body = @{
        total_amount = 2000; payment_method = "cod";
        shipping_address = @{ name = "Live User"; address = "123 Main"; city = "City"; zip = "12345"; state = "State"; phone = "1234567890" };
        items = @( $item )
    } | ConvertTo-Json -Depth 4

    Invoke-RestMethod -Uri "$baseUrl/orders" -Method Post -Headers $headers -Body $body -ContentType "application/json"
}

Write-Host "SUCCESS! Order ID: $($order.order_id)" -ForegroundColor Cyan
