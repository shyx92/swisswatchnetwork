import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface WatchModel {
  id: string;
  name: string;
  description: string;
  price: number;
  finalPrice: number;
  gbpPrice: number;
  minOrder: number;
  image: string;
  modelNumber: string;
  specifications?: string;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  modelCount: number;
}

export default function PricingPortal() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<WatchModel | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<WatchModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const modelsPerPage = 10;

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/pricing');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to load brands. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBrandModels = async (brandId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/pricing?brand=${brandId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch brand models');
      }
      const data = await response.json();
      setModels(data);
      setCurrentPage(1); // Reset to first page when changing brands
    } catch (error) {
      console.error('Error fetching brand models:', error);
      setError('Failed to load models. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
        fetchBrands();
      } else {
        setIsAuthenticated(false);
        setError('');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetchBrandModels(selectedBrand);
    }
  }, [selectedBrand]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === 'admin' && password === 'SWN1029') {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
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

  // Filter models based on search query
  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.modelNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {!selectedBrand ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {brands.map((brand) => (
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
                    <p className="mt-1 text-xs text-gray-400">{brand.modelCount} models</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {/* Brand header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to Brands
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Models table */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supplier Price (USD)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Final Price (USD)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        GBP
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentModels.map((model) => (
                      <tr key={model.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {model.modelNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${model.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${model.finalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          £{model.gbpPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Model details modal */}
          {selectedModel && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{selectedModel.name}</h3>
                    <button
                      onClick={() => setSelectedModel(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4">
                    {selectedModel.image && (
                      <div className="relative h-64 mb-4">
                        <Image
                          src={selectedModel.image}
                          alt={selectedModel.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Model Number</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedModel.modelNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedModel.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Supplier Price (USD)</p>
                        <p className="mt-1 text-sm text-gray-900">${selectedModel.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Final Price (USD)</p>
                        <p className="mt-1 text-sm text-gray-900">${selectedModel.finalPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price (GBP)</p>
                        <p className="mt-1 text-sm text-gray-900">£{selectedModel.gbpPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Minimum Order</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedModel.minOrder}</p>
                      </div>
                    </div>

                    {selectedModel.specifications && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Specifications</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedModel.specifications}</p>
                      </div>
                    )}

                    {selectedModel.description && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedModel.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 