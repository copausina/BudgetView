import { apiClient } from "./client";
import type { CategoryTotal } from "../types/analytics";

export function getCategoryTotals(params?: { type: 'expense' | 'income' }) {
  return apiClient.get<CategoryTotal[]>("/analytics/category-totals", { params });
}
