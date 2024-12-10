import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private itemsSignal = signal<Product[]>([]);

  cartCountSignal = computed(() => this.itemsSignal().length);

  constructor() { }

  addToCart(product: Product): void {
    
    this.itemsSignal.set([...this.itemsSignal(), product]);
  }

  getCartItems(): Product[] {
    return this.itemsSignal();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.itemsSignal().find(item => item.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }
  }

  removeFromCart(productId: number): void {
    this.itemsSignal.set(this.itemsSignal().filter(item => item.id !== productId));
  }

  getTotal(): number {
    return this.itemsSignal().reduce((total, item) => total + item.price, 0);
  }

  clearCart(): void {
    this.itemsSignal.set([]);
  }
}
