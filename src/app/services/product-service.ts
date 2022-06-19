import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `${environment.apiHost}/product`;
    }
    
    loadProducts(currency: string) {
        return this.http.get<Product[]>(`${this.apiUrl}/products/${currency}`);
    }
    
}
