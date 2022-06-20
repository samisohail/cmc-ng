import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency-enum';
import { OrderService } from 'src/app/services/order-service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  selectedCurrency = '';
  currencies = Object.values(Currency);

  constructor(private productService: ProductService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.selectedCurrency = this.orderService.getSelectedCurrency();
  }

  onChange(currency: string) {
    this.orderService.setCurrency(currency);
    this.productService.loadProducts(currency);
  }

}
