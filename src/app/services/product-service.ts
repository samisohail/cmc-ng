import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = `http://localhost:53413/product`;
    }
    
    loadProducts() {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    loadProductsByCurrency(currency: string) {
        return this.http.get<Product[]>(`${this.apiUrl}/products/${currency}`);
    }
}
