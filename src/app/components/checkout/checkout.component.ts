import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order-service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service';
import { takeWhile } from 'rxjs/operators';
import { CreateOrderResponse } from 'src/app/models/response/create-order-response';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private componentActive = true;
  error = false;
  orderResponse?: CreateOrderResponse;
  cartItems: Product[] = [];

  constructor(public orderService: OrderService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.cartItems = this.orderService.getCart();
  }

  onShopMore() {
    this.router.navigate(['/products']);
  }

  isEmptyCart() {
    return this.orderService.getCart().length === 0;
  }

  onCheckout() {
    this.orderService.createOrder().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(response => {
      this.error = false;
      this.orderResponse = response;
      this.orderService.emptyCart();
    },
    error => {
      this.error = true
    })
  }

  cartTotalPrice = () =>
    this.orderService.getCart().reduce((sum, current) => sum + current.unitPrice, 0);

  onCurrencyChange(currency: string) {
    this.productService.loadProducts(currency).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(products => {
      this.orderService.setCurrency(currency);
      this.orderService.updateCartItemsCurrency(products);
    });
  }

  onRemove(product: Product) {
    this.orderService.removeFromCart(product);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
