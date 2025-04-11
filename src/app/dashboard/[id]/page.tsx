'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Customer, Invoice } from '@/app/types/typesScript'; // Adjust the import path as needed
import AddInvoiceForm from '@/app/component/AddInvoiceForm';

const CustomerPage = () => {
  const { id } = useParams();
  console.log('id: ', id);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [visbleInvoice, setVisibleInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]); // Adjust the type as needed
  console.log('invoices: ', invoices);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // For controlled form inputs
  const [formData, setFormData] = useState({
    amount: '',
    status: '',
    dueDate: ''
  });
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

  // Reusable fetch function for invoices
  const fetchInvoices = async () => {
    try {
      const res = await fetch(`/api/invoice?customerId=${id}`);
      if (!res.ok) throw new Error('Failed to fetch invoices');
      const data: Invoice[] = await res.json();
      setInvoices(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Fetch invoices on mount or when `id` changes
  useEffect(() => {
    if (id) fetchInvoices();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;
  {/* Add Invoice Click Handler */ }
  const handleAddInvoiceClick = () => {
    setVisibleInvoice(true);
  };
  const handleEdit = (id: string) => {
    console.log("Edit invoice with ID:", id);
    const invoiceToEdit = invoices.find((invoice) => invoice.id === id);
    if (invoiceToEdit) {
      setFormData({
        amount: invoiceToEdit.amount.toString(),
        status: invoiceToEdit.status,
        dueDate: new Date(invoiceToEdit.dueDate).toISOString().split('T')[0] // Format date for input
      });
      setSelectedInvoice(invoiceToEdit.id); // ✅ Set selectedInvoice
      setIsEditModalOpen(true);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async () => {
    console.log("Updating invoice ID:", selectedInvoice); // 👈 Confirm ID is set
    try {
      const res = await fetch(`/api/invoice/${selectedInvoice}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update invoice');
      const updatedInvoice = await res.json();
      setInvoices((prev) =>
        prev.map((invoice) => (invoice.id === selectedInvoice ? updatedInvoice : invoice))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = (id: string) => {
    console.log("Delete invoice with ID:", id);
    // Add your delete logic here
    // Example: Call an API to delete the invoice
    fetch(`/api/invoice/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete invoice');
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      })
      .catch((error) => console.error(error));

  };

  const handlePrint = (invoice: Invoice) => {
    console.log("Print invoice:", invoice);
   
  };
  return (
    <div className="sm:p-36 px-5 py-20">
      <h1 className="text-2xl font-bold mb-4">{customer.name}</h1>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      {/* Add other fields as needed */}
      {/* Customer List Header */}
      <div className="flex items-center justify-between mt-10">
        <h2 className="text-2xl font-bold">Invoice List</h2>
        <div className='flex gap-2'>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddInvoiceClick}
          >
            + Add Invoice
          </button>
          <button onClick={() => invoices.length > 0 && handlePrint(invoices[0])} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700">Print</button>
        </div>
      </div>
      {/* Invoice List */}
      <div className="mt-4">
        {invoices.length === 0 ? (
          <p>No invoices found for this customer.</p>
        ) : (

          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold">ID</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Invoice Number</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Amount</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Due Date</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4">{invoice.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4">Rs {invoice.amount}</td>
                    <td className="px-6 py-4">{invoice.status}</td>
                    <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-2 flex-wrap">
                      <button onClick={() => handleEdit(invoice.id)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(invoice.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
