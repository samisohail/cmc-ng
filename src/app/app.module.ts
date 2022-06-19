import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product-service';
import { OrderService } from './services/order-service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CheckoutComponent,
    CurrenciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
