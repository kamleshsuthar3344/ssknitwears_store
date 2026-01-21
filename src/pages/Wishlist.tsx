import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Trash2, ShoppingBag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

export default function Wishlist() {
    const { items } = useAppSelector(state => state.wishlist);
    const dispatch = useAppDispatch();

    if (items.length === 0) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                        NO Product in your wishlist
                    </h2>
                    <Link to="/" className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        Discover Styles
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-serif font-bold mb-8">Your Wishlist</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <button
                                    onClick={() => dispatch(removeFromWishlist(item.id))}
                                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-gray-400 mb-1">{item.category}</p>
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-3">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-red-600">{item.price}</span>
                                    <button
                                        onClick={() => dispatch(addToCart(item))}
                                        className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                                        title="Add to Cart"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
