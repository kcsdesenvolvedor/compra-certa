import PurchaseProductItem from "./PurchaseProductItem";

export default interface PurchaseProduct {
    id: number;
    createdAt: string;
    status: string;
    purchaseProducts: PurchaseProductItem[];
}