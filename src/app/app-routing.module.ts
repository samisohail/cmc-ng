import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';


const routes: Routes = [
  {path:'', component: ProductsComponent},
  {path:'products', component: ProductsComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'thanks/:id', component: ThankYouComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
