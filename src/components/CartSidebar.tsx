import { useCart } from '../useContexts/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, X, Badge } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/seperator';
import { ScrollArea } from './ui/scroll-area';

export const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalCount,
    clearCart 
  } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className=" z-50 dark:bg-white bg-white/90 backdrop-blur-sm border-0 shadow-medium hover:shadow-glow hover:scale-110 transition-all duration-300"
        >
          <ShoppingCart className="h-4 w-4" />
          
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-l border-border/50">
        <SheetHeader className="p-6 pb-4 bg-gradient-card border-b border-border/50">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping Cart
          
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center p-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">Add some products to get started!</p>
            <Button onClick={toggleCart} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-120px)]">
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-card rounded-lg p-4 shadow-soft border border-border/50">
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
                      <span className="text-sm text-muted-foreground">Subtotal:</span>
                      <span className="font-semibold text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 bg-gradient-card border-t border-border/50 space-y-4">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </Button>
              </div>

              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({getTotalCount()} items):</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};