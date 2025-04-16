'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; details?: any } | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      // Send to API endpoint
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('Failed to parse response:', error);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to import file');
      }

      setMessage({
        type: 'success',
        text: `Successfully imported ${data.insertedCount} watches out of ${data.totalRows} rows`,
        details: data
      });
      setFile(null);
      router.refresh();
    } catch (error) {
      console.error('Import error:', error);
      let errorMessage = 'An error occurred while importing the file';
      
      if (error instanceof Error) {
        if (error.message.includes('duplicate key error')) {
          errorMessage = 'Some watches could not be imported due to duplicate model numbers';
        } else if (error.message.includes('validation failed')) {
          errorMessage = 'Some required fields are missing or invalid in the CSV';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Import Watch Data</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">CSV File Requirements</h2>
        <p className="text-blue-700 mb-2">Your CSV file must include these columns:</p>
        <ul className="list-disc list-inside text-blue-600 space-y-1">
          <li>model_number (required, unique identifier)</li>
          <li>brand (required)</li>
          <li>name (required)</li>
          <li>price (required, numeric)</li>
          <li>image_url (optional)</li>
          <li>description (optional)</li>
          <li>specifications (optional)</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {message && (
          <div className={`p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <p className="font-medium">{message.text}</p>
            {message.type === 'success' && message.details && (
              <div className="mt-2 text-sm">
                <p>Total rows processed: {message.details.totalRows}</p>
                <p>Successfully imported: {message.details.insertedCount}</p>
                {message.details.updatedCount > 0 && (
                  <p>Updated existing records: {message.details.updatedCount}</p>
                )}
                {message.details.errors?.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Errors:</p>
                    <ul className="list-disc list-inside">
                      {message.details.errors.slice(0, 5).map((error: string, index: number) => (
                        <li key={index}>{error}</li>
                      ))}
                      {message.details.errors.length > 5 && (
                        <li>...and {message.details.errors.length - 5} more errors</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${!file || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Importing...' : 'Import'}
        </button>
      </form>
    </div>
  );
} 