'use client';
import React, { useCallback, useEffect, useState } from 'react';
import AddCustomerForm from '../component/AddCustomerForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Customer, Invoice, InvoiceLog } from '../types/typesScript';
import Link from 'next/link';
// import { Card, CardContent } from '@/components/ui/card'; // adjust if not using shadcn
// import { Button } from '@/components/ui/button';

const Page = () => {
    const { data: session, status } = useSession();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [userData, setUserData] = useState<User[] | null>(null);
    const [outstandingInvoices, setOutstandingInvoices] = useState<Invoice[]>([]); // example
    const [revenue, setRevenue] = useState(18320); // example
    const userId = session?.user?.id || null;
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch(`/api/user?userId=${userId}`);
            const data = await response.json();
            setUserData(data);
            setCustomers(data.customers);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId, fetchUser]);

    const handleAddCustomerClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (!session) return null;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mt-16">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">Total Customers</p>
                        <p className="text-2xl font-semibold">{customers.length}</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">Outstanding Invoices</p>
                        <p className="text-2xl font-semibold">{outstandingInvoices.length}</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-semibold">${revenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>



            {/* Customer List Header */}
            <div className="flex items-center justify-between mt-10">
                <h2 className="text-2xl font-bold">Customers</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleAddCustomerClick}
                >
                    + Add Customer
                </button>
            </div>

            {/* Customer Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 mt-2">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">
                                    <Link href={`/dashboard/${customer.id}`} className="text-blue-600 hover:underline">
                                        {customer.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 border-b">{customer.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Revenue Trend Placeholder */}
            <div className="bg-white rounded-xl shadow p-6 h-64 flex items-center justify-center text-gray-400">
                Revenue trend chart goes here
            </div>
            {/* Modal Form */}
            {isFormVisible && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center">
                    <div className="relative bg-white p-6 rounded shadow-lg w-[400px]">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseForm}
                        >
                            ✕
                        </button>
                        <AddCustomerForm
                            userId={userId || ''}
                            setIsFormVisible={setIsFormVisible}
                            refetch={fetchUser}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
