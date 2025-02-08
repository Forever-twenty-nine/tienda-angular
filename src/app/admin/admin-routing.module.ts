import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
