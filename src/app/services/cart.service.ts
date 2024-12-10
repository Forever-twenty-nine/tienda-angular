import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { product: Product; quantity: number }[] = [];

  constructor() { }

  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  getCartItems(): { product: Product; quantity: number }[] {
    return this.cart;
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
  }
}
