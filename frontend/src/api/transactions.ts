import { apiClient } from "./client";
import type { Transaction, TransactionForm } from "../types/transaction";

export function getTransactions() {
  return apiClient.get<Transaction[]>("/transactions");
}

export function createTransaction(transaction: TransactionForm) {
  return apiClient.post<TransactionForm>(`/transactions`, transaction);
}

export function updateTransaction(id: number, transaction: TransactionForm) {
  return apiClient.patch<TransactionForm>(`/transactions/${id}`, transaction);
}

export function deleteTransaction(id: number) {
  return apiClient.delete<void>(`/transactions/${id}`);
}


