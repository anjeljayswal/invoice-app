'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Customer, Invoice } from '@/app/types/typesScript'; // Adjust the import path as needed
import AddInvoiceForm from '@/app/component/AddInvoiceForm';
import { fetchData } from 'next-auth/client/_utils';

const CustomerPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [visbleInvoice, setVisibleInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]); // Adjust the type as needed
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/customer/${id}`);
        if (!res.ok) throw new Error('Failed to fetch customer');
        const data: Customer = await res.json();
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`/api/invoice?customerId=${id}`);
        if (!res.ok) throw new Error('Failed to fetch invoices');
        const data: Invoice[] = await res.json();
        setInvoices(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchInvoices();
    }
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;
  {/* Add Invoice Click Handler */ }
  const handleAddInvoiceClick = () => {
    setVisibleInvoice(true);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{customer.name}</h1>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      {/* Add other fields as needed */}
      {/* Customer List Header */}
      <div className="flex items-center justify-between mt-10">
        <h2 className="text-2xl font-bold">Invoice List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddInvoiceClick}
        >
          + Add Invoice
        </button>
      </div>
      {/* Invoice List */}
      <div className="mt-4">
        {invoices.length === 0 ? (
          <p>No invoices found for this customer.</p>
        ) : (
          <ul className="space-y-4">
            {invoices.map((invoice) => (
              <li key={invoice.id} className="bg-white shadow rounded-xl p-4">
                {/* <h3 className="text-lg font-semibold">{invoice.title}</h3> */}
                <p><strong>Amount:</strong> ${invoice.amount}</p>
                <p><strong>Status:</strong> {invoice.status}</p>
                {/* Add other fields as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Invoice Form */}
      {visbleInvoice && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Invoice</h2>
          {/* Add your invoice form component here */}
          {id && <AddInvoiceForm customerId={id as string}
            onSuccess={setVisibleInvoice}
            refetch={() => { invoices }}
          />}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
            onClick={() => setVisibleInvoice(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
