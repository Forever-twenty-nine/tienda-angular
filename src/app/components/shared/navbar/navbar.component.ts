import { Component, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnChanges {


  cartCount: number;

  constructor(private cartService: CartService) {
    this.cartCount = this.cartService.cartCountSignal();
  }

  ngOnChanges(): void {
    this.cartCount = this.cartService.cartCountSignal();
  }
  
}
