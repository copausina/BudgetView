import TransactionRow from "./TransactionRow";
import { type Transaction } from "../types/transaction";
import { useMemo, useState } from "react";

type SortField = 'date' | 'description' | 'type' | 'category' | 'amount';
type SortDirection = 'asc' | 'desc';

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export default function TransactionTable({ transactions, onEdit, onDelete }: Props) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // useMemo prevents unnecessary sorting on unrelated state updates in parent component
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'category':
          aValue = a.category?.name.toLowerCase() || '';
          bValue = b.category?.name.toLowerCase() || '';
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th 
              className="text-left px-4 py-3 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('date')}
            >
              Date {getSortIcon('date')}
            </th>
            <th 
              className="text-left px-4 py-3 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('description')}
            >
              Description {getSortIcon('description')}
            </th>
            <th 
              className="text-left px-4 py-3 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('type')}
            >
              Type {getSortIcon('type')}
            </th>
            <th 
              className="text-left px-4 py-3 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('category')}
            >
              Category {getSortIcon('category')}
            </th>
            <th 
              className="text-right px-4 py-3 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('amount')}
            >
              Amount {getSortIcon('amount')}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedTransactions.map((tx) => (
            <TransactionRow key={tx.id} transaction={tx} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
