import { useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
// import { useCartContext } from "@/useContexts/useCart";
import { products } from "../data/products"
import Icon from "@mdi/react"
import { mdiCartVariant } from '@mdi/js';
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { CartProvider, useCart } from "../useContexts/CartContext";
import { CartSidebar } from "../components/CartSidebar";


const Home = () => {
    const {getTotalCount} = useCart()
    return (
        <div>
            <header className="bg-gradient-card border-b border-border/50 shadow-soft sticky top-0 z-40 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex w-full justify-between flex">
                        <div>
                            <div className="text-4xl font-bold">EStore</div>
                        </div>
                        <div className="flex">
                            {/* <Icon path={mdiCartVariant} size={1} /> */}
                            {/* Cart Sidebar */}
                <CartSidebar />
                            <span className="absolute top-2 right-0 h-5 w-5 p-0 flex items-center justify-center bg-gradient-primary text-xs">{getTotalCount()}</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mt-2">Featured Products</h2>
                    <p className="text-muted">Discover our curated collection of products.</p>
                </div>
                {/* Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: Product) => {
                        return <ProductCard key={product.id} product={product} />
                    })}
                </div>

            
            </main>
        </div>
    )
}

export default Home