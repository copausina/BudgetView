import TransactionRow from "./TransactionRow";
import { type Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export default function TransactionTable({ transactions, onEdit, onDelete }: Props) {
  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-4 py-3">Date</th>
            <th className="text-left px-4 py-3">Description</th>
            <th className="text-left px-4 py-3">Type</th>
            <th className="text-left px-4 py-3">Category</th>
            <th className="text-right px-4 py-3">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} transaction={tx} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
