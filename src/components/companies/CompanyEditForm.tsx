import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompany } from '../../lib/api';
import type { Company } from '../../types';

interface CompanyEditFormProps {
  company: Company;
  onClose: () => void;
}

export function CompanyEditForm({ company, onClose }: CompanyEditFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: company.name,
    address: company.address,
    city: company.city,
    state: company.state,
    zip_code: company.zip_code,
    phone: company.phone,
    email: company.email,
    website: company.website || ''
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateCompany(company.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      onClose();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                   focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Address *
        </label>
        <input
          type="text"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                   focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City *
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                     focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            State *
          </label>
          <input
            type="text"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                     focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ZIP Code *
          </label>
          <input
            type="text"
            name="zip_code"
            required
            value={formData.zip_code}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                     focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                     focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                   focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Website
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                   focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                   hover:text-gray-900 dark:hover:text-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md 
                   hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}