import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [  RouterLink],
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
}
