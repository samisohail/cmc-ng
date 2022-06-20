import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order-service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { OrderCost } from 'src/app/models/response/order-cost';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private componentActive = true;
  error = false;
  orderCost?: OrderCost;

  constructor(public orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.orderService.calculateCost();

    this.orderService.orderCost$.pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(cost => {
      this.orderCost = cost;
    })
  }

  onShopMore() {
    this.router.navigate(['/products']);
  }

  isEmptyCart() {
    return this.orderService.getCart().length === 0;
  }

  onPlaceOrder() {
    this.orderService.createOrder().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(response => {
      this.error = false;
      this.orderService.emptyCart();
      this.router.navigate(['/thanks', response.orderId]);
    },
    error => {
      this.error = true
    })
  }

  cartTotalPrice = () =>
    this.orderService.getCart().reduce((sum, current) => sum + current.unitPrice, 0);

  orderTotalCost() {
    if (this.orderCost) {
      return this.orderCost.productsTotal + this.orderCost.shipping;
    }
  }

  onRemove(product: Product) {
    this.orderService.removeFromCart(product);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
