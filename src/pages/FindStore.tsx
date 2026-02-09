import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Search, Navigation } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO from '../components/common/SEO';

// Store/dealer data - Add your actual store locations here
const stores: Array<{
    id: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    city: string;
    state: string;
}> = [];

const states = ["All States", ...Array.from(new Set(stores.map(s => s.state)))];

export default function FindStore() {
    const [selectedState, setSelectedState] = useState("All States");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStores = stores.filter(store => {
        const matchesState = selectedState === "All States" || store.state === selectedState;
        const matchesSearch =
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesState && matchesSearch;
    });

    return (
        <Layout>
            <SEO
                title="Find Our Stores & Dealers | SS Knitwear"
                description="Locate SS Knitwear stores and authorized dealers near you. Visit us for premium knitwear and personalized service."
            />

            {/* Hero Section */}
            <div className="pt-24 pb-12 px-4 bg-gradient-to-br from-brand-black to-gray-900">
                <div className="container mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-gold/20 text-brand-gold mb-6"
                    >
                        Visit Us
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-black text-white mb-6"
                    >
                        Find Our Stores
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-brand-gold max-w-2xl mx-auto"
                    >
                        Discover SS Knitwear stores and authorized dealers across India
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Search & Filter */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by city, store name, or address..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>
                    </div>

                    {/* State Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {states.map(state => (
                            <button
                                key={state}
                                onClick={() => setSelectedState(state)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedState === state
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Found <span className="font-bold text-black">{filteredStores.length}</span> {filteredStores.length === 1 ? 'location' : 'locations'}
                        </p>
                    </div>
                </div>

                {/* Store Grid */}
                {filteredStores.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStores.map((store, index) => (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${store.type === 'Company Store'
                                            ? 'bg-brand-gold/20 text-brand-gold'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {store.type}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Navigation className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                                        <p className="text-sm text-gray-600">{store.address}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <a href={`tel:${store.phone}`} className="text-sm text-gray-600 hover:text-black transition-colors">
                                            {store.phone}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <a href={`mailto:${store.email}`} className="text-sm text-gray-600 hover:text-black transition-colors truncate">
                                            {store.email}
                                        </a>
                                    </div>

                                    <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                                        <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                                        <p className="text-xs text-gray-500">{store.hours}</p>
                                    </div>
                                </div>

                                <button className="w-full mt-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                </button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No stores found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}

                {/* Contact CTA */}
                <div className="mt-16 bg-gradient-to-br from-brand-black to-gray-900 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Interested in Becoming a Dealer?
                    </h2>
                    <p className="text-brand-gold mb-8 max-w-2xl mx-auto">
                        Join our network of authorized dealers and bring premium SS Knitwear products to your customers
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-brand-gold text-black rounded-full font-bold hover:bg-yellow-500 transition-colors shadow-lg"
                    >
                        Contact Us for Partnership
                    </a>
                </div>
            </div>
        </Layout>
    );
}
