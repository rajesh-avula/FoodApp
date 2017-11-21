import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
const appRoutes: Routes = [
  { path: 'items', loadChildren: 'app/items/item.module#ItemsModule' },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '/items', pathMatch: 'full' }
 ];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
