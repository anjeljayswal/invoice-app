import Image from "next/image";
'use client';
export default function Home() {
  const handlesignin = () => {
    window.location.href = "/signin";
  };
  const handleSignup = () => {
    window.location.href = "/signup";
  };
  return (
   <>
   <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">InvoicePro</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300" onClick={handlesignin}>
                Sign In
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-md transition duration-300" onClick={handleSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Smart Invoicing
            </span>
            <br />
            Made Simple
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-3xl">
            Create, manage, and track professional invoices in minutes. Perfect for freelancers and businesses.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={handleSignup}>
              Get Started Free
            </button>
            {/* <button className="px-6 py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
              See Demo
            </button> */}
          </div>
        </div>

       

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose InvoicePro?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from beautifully designed invoice templates that make you look professional.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Tracking</h3>
              <p className="text-gray-600">Track billable hours and automatically add them to your invoices.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Online Payments</h3>
              <p className="text-gray-600">Get paid faster with integrated payment options like PayPal and Stripe.</p>
            </div>
          </div>
        </div>

       
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-30 ">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-lg font-semibold text-gray-800">InvoicePro</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">© 2024 InvoicePro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
   </>
  );
}
