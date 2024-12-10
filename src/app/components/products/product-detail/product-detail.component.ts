import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {

  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
    });
  }

  goToProductList() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
    this.router.navigate(['/products']);
  }
}
