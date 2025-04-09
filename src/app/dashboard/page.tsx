'use client';
import React, { useEffect, useState } from 'react';
import AddCustomerForm from '../component/AddCustomerForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const customers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
];

const Page = () => {
    const { data: session, status } = useSession();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const router = useRouter();
  
    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/'); // redirect to home if not logged in
      }
    }, [status, router]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (!session) return null;
  

    const handleAddCustomerClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    return (
        <div className=''>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mt-20">
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleAddCustomerClick}
                    >
                        + Add Customer
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{customer.name}</td>
                                    <td className="px-4 py-2 border-b">{customer.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseForm}
                        >
                            ✕
                        </button>
                        <AddCustomerForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;