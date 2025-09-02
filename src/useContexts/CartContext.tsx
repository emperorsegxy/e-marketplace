import { createContext, ReactNode, useContext, useReducer } from "react";
import { CartItem, Product } from "../types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
  clearCart: () => void;
  toggleCart: () => void;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } };

export const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // auto-remove item if quantity <= 0
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case "TOGGLE_CART":
      return {...state, isOpen: !state.isOpen}
    

    case "CLEAR_CART":
      return {...state, items: []}

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const getTotalPrice = () =>
    state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  const getTotalCount = () =>
    state.items.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => {
    dispatch({type:'TOGGLE_CART'});
  }
  
  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalCount,
        toggleCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
