import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { OrderService } from './order-service';

@Injectable({
    providedIn: 'root'
})

export class ProductService implements OnDestroy {
    private serviceActive = true;
    private readonly apiUrl: string;

    products$ = new BehaviorSubject<Product[]>([]);

    constructor(private http: HttpClient, private orderService: OrderService) {
        this.apiUrl = `${environment.apiHost}/product`;
    }
    
    loadProducts(currency: string) {
        this.http.get<Product[]>(`${this.apiUrl}/products/${currency}`).pipe(
            takeWhile(() => this.serviceActive)
        ).subscribe(products => {
            this.products$.next(products);
            this.orderService.updateCartItemsCurrency(products);
            this.orderService.calculateCost();
        });
    }        

    ngOnDestroy() {
        this.serviceActive = false;
        this.products$.complete();
    }
}
