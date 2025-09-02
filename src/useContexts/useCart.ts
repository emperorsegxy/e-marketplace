import { createContext } from "react";

interface ICart {
    carts: any[],
    setCarts: (carts: any[]) => void
}

export const useCartContext = createContext<ICart>({
    carts: [],
    setCarts: (carts) => {
        
    }
})