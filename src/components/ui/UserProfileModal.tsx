import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from './Modal';
import { updateUserProfile } from '../../lib/api';
import type { UserProfile } from '../../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export function UserProfileModal({ isOpen, onClose, profile }: UserProfileModalProps) {
  const [fullName, setFullName] = useState(profile.full_name || '');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateUserProfile({ full_name: fullName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentProfile'] });
      onClose();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="fullName" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100
                     focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex justify-end space-x-3">
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
    </Modal>
  );
}