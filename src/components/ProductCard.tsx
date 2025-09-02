import { Product } from "@/types/product";
import { useCart } from "../useContexts/CartContext";
import { useState } from "react";
import currencyFormatter from "../utils/currencyFormatter";

interface ProductCardProps {
    product: Product
}

function ProductCard ({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false)
    const {addToCart } = useCart()

    const handleAddToCart = () => {
        setIsAdding(true)
        addToCart(product)
        setTimeout(() => {setIsAdding(false)}, 1000)
    }
    return (
        <div className="card pa-1">
            <img
            src={product.image}
            alt={product.name}
            className="w-full"
            />
            {/* product name */}
            <div className="p-6">
                <div>
                    <h3>{product.name}</h3>
                </div>
                <div>
                    <h3>{product.description}</h3>
                </div>
                <div className="price">
                    <h2>{currencyFormatter(product.price)}</h2>
                </div>
                <div className="card-footer">
                    <button disabled={isAdding} onClick={handleAddToCart} className="`w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 ${
            isAdding ? 'scale-95' : 'hover:scale-105'
          }`">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard