import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Currency } from '../models/currency-enum';
import { CreateOrderPayload } from '../models/requests/create-order-payload';
import { CreateOrderResponse } from '../models/response/create-order-response';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private readonly apiUrl: string;
    private cart: Product[] = [];
    private selectedCurrency: string = Currency.AUD;

    constructor(private http: HttpClient) {
        this.apiUrl = `http://localhost:53413/order`;
    }

    calculateCost() {
        // return this.http.get<BudgetLookups>(`${this.budgetApiUrl}/lookups`);
    }

    createOrder() {
        const payload = this.createOrderPayload();
        return this.http.post<CreateOrderResponse>(`${this.apiUrl}`, payload);
    }

    getCart = () =>this.cart;    
    emptyCart = () => this.cart = [];    

    setCurrency = (currency: string) => this.selectedCurrency = currency;
    getSelectedCurrency () {
        return this.selectedCurrency;
    }

    addToCart(product: Product) {
        const index = this.cart.findIndex(p => p.productId == product.productId);
        if (index > -1) {
            this.cart[index] = product; // override existing with potential changed one e.g. quantity
        } else {
            this.cart.push(product);
        }
    }

    removeFromCart(product: Product) {
        const index = this.cart.findIndex(p => p.productId == product.productId);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
    }

    updateCartItemsCurrency(products: Product[]) {
        this.cart.forEach(item => {
            const found = products.find(x => x.productId === item.productId);
            if (found) {
                item.currency = found.currency;
                item.unitPrice = found.unitPrice;
            }
        })
    }

    private createOrderPayload(): CreateOrderPayload {
        const payload: CreateOrderPayload = {
            address: 'a dummy address in heaven',
            customerId: 1, // a dummy logged in user id
            cartItems: this.cart.map(item => ({ 
                productId: item.productId,
                quantity: item.quantity,
                currency: this.selectedCurrency
            }))
        }
        return payload
    }
}