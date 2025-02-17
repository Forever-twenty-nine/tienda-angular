// angular 
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
// primeNg
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
// services
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports:
    [
      MenubarModule,
      ButtonModule
    ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  user: boolean = false;
  menuItems: MenuItem[] = 
  [
    { label: 'Productos', icon: 'pi pi-box', routerLink: '/products' },
    { label: 'Carrito', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
    { label: 'Iniciar Sesión', icon: 'pi pi-sign-in', routerLink: '/login' , visible: !this.user},
  ];

  cartCount: any;
  menuOpen: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.cartCount = this.cartService.cartCountSignal;

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }

}
