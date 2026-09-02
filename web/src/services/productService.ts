import type { Product, ProductInput } from '../types/product';
import { ApiError, apiClient } from './apiClient';

export function getProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>('/products');
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    return await apiClient.get<Product>(`/products/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export function addProduct(input: ProductInput): Promise<Product> {
  return apiClient.post<Product>('/products', input);
}

export function updateProduct(id: string, input: ProductInput): Promise<Product> {
  return apiClient.put<Product>(`/products/${id}`, input);
}

export function deleteProduct(id: string): Promise<void> {
  return apiClient.delete<void>(`/products/${id}`);
}
