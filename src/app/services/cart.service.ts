import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  // Signal para obtener el conteo de productos en el carrito
  cartCountSignal = computed(() =>
    this.cartItemsSignal().reduce((count, item) => count + item.quantity, 0)
  );

  constructor() { }

  addToCart(product: Product): void {
    const existingItem = this.cartItemsSignal().find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItemsSignal.set([...this.cartItemsSignal(), { product, quantity: 1 }]);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSignal();
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.cartItemsSignal();
    const itemIndex = items.findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
      items[itemIndex].quantity = quantity > 0 ? quantity : 1;
      this.cartItemsSignal.set([...items]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.set(this.cartItemsSignal().filter(item => item.product.id !== productId));
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}
