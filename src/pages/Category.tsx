import Layout from '../components/layout/Layout';

export default function Category() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                    Explore our wide range of Categories
                </h1>
                <p className="text-gray-500">
                    Find the perfect style for everyone.
                </p>
            </div>
        </Layout>
    );
}
