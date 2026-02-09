import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';
import Modal from '../../components/ui/Modal';

export default function SellerProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/seller/products');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: number) => {
        setProductToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        console.log('🔴 Deleting product:', productToDelete);

        try {
            console.log('🚀 Sending delete request...');
            const response = await api.delete(`/seller/products/${productToDelete}`);
            console.log('✅ Delete response:', response);
            setProducts(prev => prev.filter(p => p.id !== productToDelete));
            toast.success('Product deleted successfully!');
            setDeleteModalOpen(false);
            setProductToDelete(null);
        } catch (error: any) {
            console.error('❌ Delete error:', error);
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete';
            toast.error(errorMessage);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Products</h1>
                <Link to="/seller/add-product" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add New
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                    <p className="text-gray-500 mb-4">No products listed yet.</p>
                    <Link to="/seller/add-product" className="text-blue-600 font-bold hover:underline">Create your first product</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 relative">
                                {product.images?.main ? (
                                    <img src={product.images.main} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span>No Image</span>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => navigate(`/seller/products/${product.id}/edit`)}
                                        className="bg-white p-2 rounded-full shadow-sm hover:text-blue-600"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-white p-2 rounded-full shadow-sm hover:text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold truncate">{product.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-500">₹{product.price}</p>
                                    <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Product"
                maxWidth="max-w-md"
            >
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">Are you sure?</h3>
                            <p className="text-sm text-gray-600">
                                This will permanently delete this product and all its variants and images. This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
