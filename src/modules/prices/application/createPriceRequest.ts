export interface CreatePriceRequest {
  id: string;
  productId: string;
  storeId: string;
  price: number;
  currency: string;
  collectedAt: string;
  source: string;
}

