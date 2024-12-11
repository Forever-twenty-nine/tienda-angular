import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [  RouterLink, NgOptimizedImage ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantity(productId);
  }
}
