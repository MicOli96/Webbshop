import type { Order, OrderInput } from "../types/order";
import { apiClient } from "./apiClient";

export function createOrder(input: OrderInput): Promise<Order> {
  return apiClient.post<Order>("/orders", input);
}

export function getOrder(id: string): Promise<Order> {
  return apiClient.get<Order>(`/orders/${id}`);
}