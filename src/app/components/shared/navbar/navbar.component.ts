// angular 
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// primeNg
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
// services
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports:
    [
      Menu,
      RouterLink,
      MenubarModule,
      ButtonModule
    ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  menuItems: MenuItem[] = [];
  userMenu: MenuItem[] = [];

  cartCount: any;
  user: any;
  menuOpen: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.cartCount = this.cartService.cartCountSignal;
    this.user = this.authService.isAuthenticated();
  }
  setupMenuItems() {
    this.menuItems = [
      { label: 'Productos', icon: 'pi pi-box', routerLink: '/products' },
      { label: 'Carrito', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
    ];
  }

  setupUserMenu() {
    this.userMenu = this.user
      ? [
        { label: 'Ver Perfil', icon: 'pi pi-user', routerLink: '/profile' },
        { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
      ]
      : [];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }

}
