"use client"

import { useState, useRef, useEffect } from 'react';
import { renameProfile } from '@/lib/actions';

export default function FullNameEditor({ initialFullName }: { initialFullName: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(initialFullName);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRename = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await renameProfile(fullName);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex flex-col items-center mb-6">
      {isEditing ? (
        <form onSubmit={handleRename} className="w-full flex flex-col items-center">
          <input
            ref={inputRef}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
          <button type="submit" className="mt-2 py-1 px-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors">Save</button>
        </form>
      ) : (
        <h1
          className={`text-2xl font-semibold text-gray-900 border border-gray-300 p-2 rounded-md cursor-pointer flex items-center ${!fullName ? 'italic text-gray-500' : ''}`}
          onClick={() => setIsEditing(true)}
        >
          {fullName || 'Click to add your name'}
          <span className="ml-2">✏️</span>
        </h1>
      )}
    </div>
  );
}
