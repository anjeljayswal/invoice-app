'use client'

import { useState } from 'react'

interface AddInvoiceFormProps {
  customerId: string;
//   userId: string;
  setIsFormVisible: (isVisible: boolean) => void;
  refetch: () => void;
}

export default function AddInvoiceForm({ customerId, setIsFormVisible, refetch }: AddInvoiceFormProps) {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/invoice', {
      method: 'POST',
      body: JSON.stringify({ customerId,  amount, dueDate, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.ok) {
      refetch();
      setMessage('Invoice added successfully!');
      setAmount('');
      setDueDate('');
      setDescription('');
      setIsFormVisible(false);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Invoice</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add Invoice
      </button>

      {message && (
        <p className={`mt-3 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
