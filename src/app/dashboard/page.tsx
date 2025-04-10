'use client';
import React, { useCallback, useEffect, useState } from 'react';
import AddCustomerForm from '../component/AddCustomerForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Customer, Invoice, InvoiceLog } from '../types/typesScript';
import Link from 'next/link';
import RevenueChart from '../component/RevenueChart';
// import { Card, CardContent } from '@/components/ui/card'; // adjust if not using shadcn
// import { Button } from '@/components/ui/button';

const Page = () => {
    const { data: session, status } = useSession();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    console.log('customers: ', customers);
    const [userData, setUserData] = useState<User[] | null>(null);
    const [outstandingInvoices, setOutstandingInvoices] = useState<Invoice[]>([]); // example
    const [revenue, setRevenue] = useState(18320); // example
    const userId = session?.user?.id || null;
    const router = useRouter();
    // const id = customers.id;
    // const toatalOutsandingInvoices = async () => {
    //     try {
    //         const response = await fetch(`/api/invoice?/api/invoice`);
    //         const data = await response.json();
    //         const outstanding = data.filter((invoice: Invoice) => invoice.status === 'Pending' || invoice.status === 'Past Due');
    //         const totalRevenue = data.reduce((acc: number, invoice: Invoice) => acc + invoice.amount, 0);
    //         setOutstandingInvoices(outstanding);
    //     }
    //     catch (err) {
    //         console.error("Fetch error:", err);
    //     }
    // };
    // useEffect(() => {
    //     if (userId) {
    //         toatalOutsandingInvoices();
    //     }
    // }, [userId]);
    // console.log('setOutstandingInvoices: ', outstandingInvoices);

    const outstandingInvoicess = customers.flatMap(customer =>
        customer.invoices.filter(invoice => {
            const status = invoice.status?.toLowerCase().trim(); // safe check
            return status === 'pending' || status === 'past due';
        })
    );

    console.log('Filtered outstanding invoices:', outstandingInvoicess);

    const outstandingRevenue = outstandingInvoicess.reduce((sum, invoice) => {
        const amount = typeof invoice.amount === 'number' ? invoice.amount : 0;
        return sum + amount;
    }, 0);

    console.log('Total outstanding revenue:', outstandingRevenue);

    const totalRevenue = customers.reduce((acc, customer) => {
        const customerTotal = customer.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

        return acc + customerTotal;
    }, 0);
    console.log('totalRevenue', totalRevenue);
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    const fetchUser = useCallback(async () => {
        const start = performance.now();
        try {
            const response = await fetch(`/api/user?userId=${userId}`);
            const data = await response.json();
            setUserData(data);
            setCustomers(data.customers);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            const end = performance.now();
            console.log("API call duration:", end - start, "ms");
        }
    }, [userId]);
    // console.log('setCustomers: ', setCustomers);

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
        <div className="p-6 space-y-6 flex flex-col items-center w-full justify-center">
            <h1 className="text-3xl font-bold mt-16">Dashboard</h1>

            {/* Stats Cards */}
            <div className='w-full md:px-28'>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 ">
                <div className="bg-white shadow rounded-xl p-4 bg-gradient-to-r from-indigo-100 to-purple-100">
                    <p className="text-gray-500">Total Customers</p>
                    <p className="text-2xl font-semibold">{customers.length}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-4 bg-gradient-to-r from-indigo-100 to-purple-100">
                    <p className="text-gray-500">Outstanding Invoices</p>
                    <p className="text-2xl font-semibold">Rs {outstandingRevenue}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-4 bg-gradient-to-r from-indigo-100 to-purple-100">
                    <p className="text-gray-500">Total Outstanding Invoices</p>
                    <p className="text-2xl font-semibold">{outstandingInvoicess.length}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-4 bg-gradient-to-r from-indigo-100 to-purple-100">
                    <p className="text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold">Rs {totalRevenue}</p>
                </div>
            </div>
            </div>
        
            {/* Customer List Header */}
            <div className="flex items-center justify-between mt-10 w-full md:px-28">
                <h2 className="text-2xl font-bold">Customers</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleAddCustomerClick}
                >
                    + Add Customer
                </button>
            </div>

            {/* Customer Table */}
            <div className="overflow-x-auto min-w-full md:px-28">
                <table className="min-w-full bg-white border border-gray-200 mt-2">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className='px-4 py-2 border-b'>Action</th>
                            {/* <th className="px-4 py-2 border-b">Invoices</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">
                                    {/* <Link href={`/dashboard/${customer.id}`} className="text-blue-600 hover:underline"> */}
                                        {customer.name}
                                    {/* </Link> */}
                                </td>
                                <td className="px-4 py-2 border-b">{customer.email}</td>
                                <td className="px-4 py-2 border-b">
                                <Link href={`/dashboard/${customer.id}`} className="text-blue-600 hover:underline">

                                   <button type="button">Open</button>
                                   </Link>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Revenue Trend Placeholder */}
            <div className=" h-64 flex items-center justify-center  my-10 w-full md:px-28">
                {/* Revenue trend chart goes here */}
                <RevenueChart customers={customers} />

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
