'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Customer } from '@/app/types/typesScript'; // Adjust the import path as needed

const CustomerPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{customer.name}</h1>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default CustomerPage;
