import { getCategories } from "../api/categories";
import type { Transaction, Category } from "../types/transaction";
import { useEffect, useState } from "react";

export default function TransactionRow({ transaction, onEdit, onDelete }: { transaction: Transaction; onEdit: (transaction: Transaction) => void; onDelete: (transaction: Transaction) => void }) {
  const isIncome = transaction.type === "income";
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (  
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        {new Date(transaction.date).toLocaleDateString()}
      </td>

      <td className="px-4 py-3">{transaction.description}</td>

      <td className="px-4 py-3 capitalize">
        {transaction.type}
      </td>

      <td className="px-4 py-3 capitalize">
        {categories.find(c => c.id === transaction.category_id)?.name}
      </td>

      <td className={`px-4 py-3 text-right font-semibold ${
        isIncome ? "text-green-600" : "text-red-600"
      }`}>
        ${transaction.amount.toFixed(2)}
      </td>

      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onEdit(transaction)}
          className="btn btn-yellow"
        >
          Edit
        </button>
      </td>

      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onDelete(transaction)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
