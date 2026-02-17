import { useEffect, useState } from 'react'
import './App.css'
import TransactionTable from './components/TransactionTable'
import { getTransactions } from './api/transactions'
import TransactionModal from './components/TransactionModal'
import type { Transaction } from './types/transaction'
import CategoryPieChart from './components/CategoryPieChart'
import { getCashflowOverTime, getCategoryTotals } from './api/analytics'
import type { CashflowOverPeriod, CategoryTotal } from './types/analytics'
import CashflowLineChart from './components/CashflowLineChart'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cashflowData, setCashflowData] = useState<CashflowOverPeriod[]>([]);
  const [expenseCategoryTotals, setExpenseCategoryTotals] = useState<CategoryTotal[]>([]);
  const [incomeCategoryTotals, setIncomeCategoryTotals] = useState<CategoryTotal[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    getTransactions().then(setTransactions);
    getCategoryTotals({ type: 'expense' }).then(setExpenseCategoryTotals);
    getCategoryTotals({ type: 'income' }).then(setIncomeCategoryTotals);
    getCashflowOverTime().then(setCashflowData);
  }, []);

  const [operation, setOperation] = useState<'create' | 'edit' | 'delete'>('create');

  function openCreateModal() {
    setEditingTransaction(null);
    setOperation('create');
    setIsModalOpen(true);
  }

  function openEditModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    setOperation('edit');
    setIsModalOpen(true);
  }

  function openDeleteModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    setOperation('delete');
    setIsModalOpen(true);
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="mb-3">
        <CashflowLineChart data={cashflowData} />
      </div>
      <div className="flex justify-around gap-4 mb-6">  
        <CategoryPieChart data={expenseCategoryTotals} title="Expenses by Category" />
        <CategoryPieChart data={incomeCategoryTotals} title="Income by Category" />
      </div>
      <div className="flex justify-between mb-4">    
        <h1 className="text-xl font-semibold">Transactions</h1>

        <button
          onClick={openCreateModal}
          className="btn-green px-4 py-2 rounded hover:bg-blue-700"
        >
          New Transaction
        </button>
      </div>

      <TransactionTable
        transactions={transactions}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {isModalOpen && (
        <TransactionModal
          transaction={editingTransaction}
          operation={operation}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App
