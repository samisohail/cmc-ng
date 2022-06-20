import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product-service';
import { OrderService } from 'src/app/services/order-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {

  private componentActive = true;  

  constructor(
    private router: Router,
    public productService: ProductService,
    public orderService: OrderService) { }

  ngOnInit() {
    const currency = this.orderService.getSelectedCurrency();
    this.productService.loadProducts(currency);
  }

  onAdd(product: Product) {
    product.quantity = 1; // assumption for code challenge only
    this.orderService.addToCart(product);
  }

  onRemove = (product: Product) => this.orderService.removeFromCart(product);  

  onCheckout = () =>    this.router.navigate(['/checkout']);

  isInCart = (product: Product) =>
    this.orderService.getCart().findIndex(cart => cart.productId === product.productId) > -1;
  
  itemsInCart = () => this.orderService.getCart().length; 

  ngOnDestroy = () => this.componentActive = false;  

}
