import Layout from '../components/layout/Layout';
import HeroSlider from '../components/home/HeroSlider';
import CategorySection from '../components/home/CategorySection';
import FloatingProducts from '../components/home/FloatingProducts';

export default function Home() {
    return (
        <Layout hideHeader={true}>
            <HeroSlider />
            <div className="relative z-10 bg-white rounded-t-3xl -mt-6 pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                <CategorySection />
            </div>
            <FloatingProducts />
            <div className="h-20" /> {/* Spacer for bottom nav */}
        </Layout>
    );
}
