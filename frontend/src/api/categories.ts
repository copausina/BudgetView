import { apiClient } from "./client";
import type { Category } from "../types/transaction";

export function getCategories() {
  return apiClient.get<Category[]>("/categories/");
}



