import { apiClient } from "./client";
import type { CashflowOverTime, CategoryTotal } from "../types/analytics";

export function getCategoryTotals(params?: { type: 'expense' | 'income' }) {
  return apiClient.get<CategoryTotal[]>("/analytics/category-totals", { params });
}

export function getCashflowOverTime() {
  return apiClient.get<CashflowOverTime[]>("/analytics/cashflow-over-time");
}
