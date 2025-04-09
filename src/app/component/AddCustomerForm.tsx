// components/AddCustomerForm.tsx
'use client'

// import { add } from 'date-fns'
import { useState } from 'react'
interface AddCustomerFormProps {
  userId: string;
  setIsFormVisible: (isVisible: boolean) => void;
  refetch: () => void; // Function to refetch data
}

export default function AddCustomerForm({ userId, setIsFormVisible, refetch }: AddCustomerFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [externalCustomerId, setExternalCustomerId] = useState('')
  const [message, setMessage] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState('')


  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/customer', {
      method: 'POST',
      body: JSON.stringify({ name, email, externalCustomerId, address, phoneNo, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (res.ok) {
      // ✅ Call the refetch function
      if (typeof refetch === 'function') {
        refetch();
      }
      setMessage('Customer added successfully!')
      setName('')
      setEmail('')
      setExternalCustomerId('')
      setAddress('')
      setPhoneNo('')
      setIsFormVisible(false)

    } else {
      setMessage(`Error: ${data.error}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-white/20 backdrop-blur-sm"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
          Add New Customer
        </h2>
        <p className="mt-2 text-sm text-gray-500">Fill in the details to create a new customer profile</p>
      </div>

      <div className="space-y-5">
        <div className="relative group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1 ml-1">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 group-hover:shadow-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300"></div>
        </div>

        <div className="relative group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1 ml-1">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 group-hover:shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300"></div>
        </div>

        <div className="relative group">
          <label htmlFor="externalId" className="block text-sm font-medium text-gray-600 mb-1 ml-1">
            External Customer ID
          </label>
          <input
            id="externalId"
            type="text"
            placeholder="CUST-12345"
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 group-hover:shadow-md"
            value={externalCustomerId}
            onChange={(e) => setExternalCustomerId(e.target.value)}
          />
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300"></div>
        </div>

        <div className="relative group">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1 ml-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="123 Main St, City"
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 group-hover:shadow-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300"></div>
        </div>

        <div className="relative group">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1 ml-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 group-hover:shadow-md"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-300"></div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-semibold"
      >
        Add Customer
        <span className="ml-2">→</span>
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"} transition-all duration-300`}>
          {message}
        </div>
      )}
    </form>
  )
}
