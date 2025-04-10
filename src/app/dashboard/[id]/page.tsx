'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Customer, Invoice } from '@/app/types/typesScript'; // Adjust the import path as needed
import AddInvoiceForm from '@/app/component/AddInvoiceForm';
import { fetchData } from 'next-auth/client/_utils';

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
  };

  const handlePrint = (invoice: Invoice) => {
    console.log("Print invoice:", invoice);
    // Example: You could open a print dialog or generate a PDF
    window.print();
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
          // <ul className="space-y-4">
          //   {invoices.map((invoice) => (
          //     <li key={invoice.id} className="bg-white shadow rounded-xl p-4">
          //       {/* <h3 className="text-lg font-semibold">{invoice.title}</h3> */}
          //       <p><strong>Amount:</strong> Rs {invoice.amount}</p>
          //       <p><strong>Status:</strong> {invoice.status}</p>
          //       {/* Add other fields as needed */}
          //       <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>

          //     </li>
          //   ))}
          // </ul>
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
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(invoice.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    {isEditModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                          <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>

                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Amount</label>
                            <input
                              type="number"
                              name="amount"
                              value={formData.amount}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <input
                              type="text"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Due Date</label>
                            <input
                              type="date"
                              name="dueDate"
                              value={formData.dueDate}
                              onChange={handleChange}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>

                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setIsEditModalOpen(false)}
                              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdate}
                              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleDelete(invoice.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handlePrint(invoice)}
                      className="text-green-600 hover:underline"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
