'use client'
import { useState } from 'react';

interface AddInvoiceFormProps {
  customerId: string;
  onSuccess: (success: boolean) => void;
  refetch?: () => void;
  
}

export default function AddInvoiceForm({ customerId, onSuccess,refetch }: AddInvoiceFormProps) {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [externalInvoiceId, setExternalInvoiceId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoiceNumber,
        externalInvoiceId,
        amount,
        dueDate,
        customerId,
        status,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Invoice added!');
      setInvoiceNumber('');
      setExternalInvoiceId('');
      setAmount('');
      setDueDate('');
      onSuccess(false);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Invoice</h2>

      <input
        type="text"
        placeholder="Invoice Number"
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <input
        type="text"
        placeholder="External Invoice ID"
        value={externalInvoiceId}
        onChange={(e) => setExternalInvoiceId(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
        <option value="Past Due">Past Due</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </form>
  );
}
