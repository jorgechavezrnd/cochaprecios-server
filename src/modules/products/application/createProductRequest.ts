export interface CreateProductRequest {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
}
