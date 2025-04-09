'use client';
import React, { useCallback, useEffect, useState } from 'react';
import AddCustomerForm from '../component/AddCustomerForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Customer } from '../types/typesScript';
import Link from 'next/link';

const Page = () => {
    const { data: session, status } = useSession();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const userId = session?.user?.id || null; // Get user ID from session
    console.log("userId from session: ", userId);
    const [customers, setCustomers] = useState<Customer[]>([]); // Initialize customers state
    const router = useRouter();
    const [userData, setUserData] = useState<User[] | null>(null); // Initialize userData state
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/'); // redirect to home if not logged in
        }
    }, [status, router]);

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch(`/api/user?userId=${userId}`);
            const data = await response.json();
            console.log("Fetched user data:", data);
            setUserData(data);
            setCustomers(data.customers); // Set customers state with fetched data
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }, [userId]);
    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId, fetchUser]);
    console.log('setUserData: ', userData);

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
                                    <td className="px-4 py-2 border-b"> 
                                        <Link href={`/dashboard/${customer.id}`} className="text-blue-600 hover:underline">
                                        {customer.name}
                                    </Link></td>
                                    <td className="px-4 py-2 border-b">{customer.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormVisible && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center mt-15">
                    <div className="rounded shadow-lg">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseForm}
                        >
                            ✕
                        </button>
                        <AddCustomerForm userId={userId || ''} setIsFormVisible={setIsFormVisible} refetch={fetchUser} // ✅ pass fetchUser
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;