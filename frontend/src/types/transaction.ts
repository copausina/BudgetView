export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export interface TransactionForm {
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category_id: number | null;
}

export type Category = {
  id: number;
  name: string;
  type: TransactionType;
};