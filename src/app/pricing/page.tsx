'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface WatchModel {
  id: string;
  name: string;
  description: string;
  price: number;
  finalPrice: number;
  gbpPrice?: number;
  minOrder: number;
  image?: string;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  models: WatchModel[];
}

export default function PricingPortal() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<WatchModel | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pricingData, setPricingData] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const modelsPerPage = 10;

  const fetchPricingData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/.netlify/functions/pricing');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing data');
      }
      const data = await response.json();
      setPricingData(data);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
      setError('Failed to load pricing data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
        fetchPricingData();
      } else {
        setIsAuthenticated(false);
        setError('');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === 'admin' && password === 'SWN1029') {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('isAuthenticated', 'true');
      await fetchPricingData();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setPricingData([]);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Wholesale Pricing Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to access wholesale pricing
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  const selectedBrandData = selectedBrand ? pricingData.find(b => b.id === selectedBrand) : null;

  // Filter models based on search query
  const filteredModels = selectedBrandData?.models.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Pagination
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Wholesale Pricing Portal</h1>
              <p className="mt-2 text-gray-600">Welcome, Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-8">
            {!selectedBrand ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {pricingData.map((brand) => (
                  <div
                    key={brand.id}
                    className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedBrand(brand.id)}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="relative h-12 sm:h-16 mb-4">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">{brand.name}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-gray-500">{brand.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Brands
                </button>

                {selectedBrandData && (
                  <div>
                    <div className="p-4 sm:p-6">
                      <div className="relative h-12 sm:h-16 mb-4">
                        <Image
                          src={selectedBrandData.logo}
                          alt={selectedBrandData.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedBrandData.name}</h2>
                      <p className="mt-2 text-sm sm:text-base text-gray-600">{selectedBrandData.description}</p>
                      
                      <div className="mt-6 sm:mt-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Available Models</h3>
                          <div className="w-full sm:w-64">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search models..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                          <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:pl-6">
                                      Model Number
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Supplier Price (USD)
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Final Price (USD)
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                      GBP
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                      <span className="sr-only">Actions</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {currentModels.map((model) => (
                                    <tr key={model.id} className="hover:bg-gray-50">
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {model.name}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        ${model.price}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        ${model.finalPrice}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">
                                        £{model.gbpPrice}
                                      </td>
                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button
                                          onClick={() => setSelectedModel(model)}
                                          className="text-blue-600 hover:text-blue-900"
                                        >
                                          View
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                          <div className="text-sm text-gray-700">
                            Showing {indexOfFirstModel + 1} to {Math.min(indexOfLastModel, filteredModels.length)} of {filteredModels.length} results
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="px-3 py-1 border rounded-md disabled:opacity-50"
                            >
                              Previous
                            </button>
                            <button
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="px-3 py-1 border rounded-md disabled:opacity-50"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Details Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{selectedModel.name}</h3>
                <button
                  onClick={() => setSelectedModel(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                {selectedModel.image && (
                  <div className="relative h-48 sm:h-64 mb-4">
                    <Image
                      src={selectedModel.image}
                      alt={selectedModel.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Model Number</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedModel.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Supplier Price (USD)</p>
                    <p className="mt-1 text-sm text-gray-900">${selectedModel.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Final Price (USD)</p>
                    <p className="mt-1 text-sm text-gray-900">${selectedModel.finalPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price (GBP)</p>
                    <p className="mt-1 text-sm text-gray-900">£{selectedModel.gbpPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 