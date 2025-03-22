import Product from "./Product";

export default interface PurchaseProductItem {
    productId: number;
    quantity: number;
    product: Product;   
}