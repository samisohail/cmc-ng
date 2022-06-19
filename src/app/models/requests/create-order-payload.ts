export interface CreateOrderPayload {
    address: string;
    customerId: number;
    cartItems: CartItem[];
}

interface CartItem {
    productId: number;
    quantity: number;
    currency: string;
}
