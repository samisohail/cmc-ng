import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Currency } from 'src/app/models/currency-enum';
import { takeWhile } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order-service';
import { ProductService } from 'src/app/services/product-service';


@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit, OnDestroy {

  private componentActive = true;

  selectedCurrency = '';
  @Output() currencyChanged = new EventEmitter<Currency>();

  currencies = Object.values(Currency);
  constructor(private productService: ProductService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.selectedCurrency = this.orderService.getSelectedCurrency();
  }

  onChange(value) {
    console.log(value);
    this.currencyChanged.emit(value);
  }

  onCurrencyChange(currency: string) {
    this.productService.loadProductsByCurrency(currency).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(products => {
      this.orderService.setCurrency(currency);
      this.orderService.updateCartItemsCurrency(products);
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
