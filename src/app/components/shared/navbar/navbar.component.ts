import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  cartCount: any;

  constructor(private cartService: CartService) {
    this.cartCount = this.cartService.cartCountSignal;
  }
}
