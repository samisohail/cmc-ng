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

  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    public orderService: OrderService) { }

  ngOnInit() {
    this.productsByCurrency(this.orderService.getSelectedCurrency());
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
  
  cartTotalPrice = () =>
    this.orderService.getCart().reduce((sum, current) => sum + current.unitPrice, 0);
  
  productsByCurrency(currency: string) {
    this.productService.loadProductsByCurrency(currency).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(products => {
      this.orderService.setCurrency(currency);
      this.orderService.updateCartItemsCurrency(products);
      this.products = products;
    });
  }

  ngOnDestroy = () => this.componentActive = false;  

}
