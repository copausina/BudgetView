import { useState, useEffect } from "react";
import type { Category, Transaction, TransactionType, TransactionForm } from "../types/transaction";
import { updateTransaction, createTransaction, deleteTransaction } from "../api/transactions";
import { getCategories } from "../api/categories";

export default function TransactionModal({
  transaction,
  operation,
  onClose,
}: {
  transaction: Transaction | null;
  operation: "create" | "edit" | "delete";
  onClose: () => void;
}) {

  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    type: "expense" as TransactionType,
    category_id: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: transaction.amount.toString(),
        date: transaction.date.slice(0, 10),
        type: transaction.type,
        category_id: transaction.category_id,
      });
    }
  }, [transaction]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const filteredCategories = categories.filter(
    c => c.type === form.type
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (e.target.name === 'amount') {
        const amt = Number(e.target.value);
        if (amt < 0) {
            return;
        }
    }
      
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement> | React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const transactionForm: TransactionForm = {
      description: form.description,
      amount: Number(form.amount),
      date: form.date,
      type: form.type,
      category_id: form.category_id,
    };

    if (operation === "edit") {
      updateTransaction(transaction.id, transactionForm);
    } else if (operation === "delete") {
      deleteTransaction(transaction.id);
    } else {
      createTransaction(transactionForm);
    }

    onClose();
  }

  if (operation === "delete") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Delete Transaction?
          </h2>
          <p>Are you sure you want to delete "{transaction?.description}"?</p>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-red-600 text-white px-3 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {operation === "edit" ? "Edit Transaction" : "New Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            name="category_id"
            value={form.category_id}
            onChange={(e) =>
                setForm({ ...form, category_id: Number(e.target.value) })
            }
            className="w-full border rounded p-2"
          >
            <option value="">Select category</option>

            {filteredCategories.map(category => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 px-3 py-2 rounded"
            >
              {operation === "edit" ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
