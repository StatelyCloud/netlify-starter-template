"use client"

import { Link } from '@/lib/generated';

export default function LinksTable({ links, onDeleteLink } : { links: Link[], onDeleteLink: (id: bigint) => void }) {
  const handleDelete = async (id: bigint) => {
    await onDeleteLink(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Title</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">URL</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link : Link) => (
            <tr key={link.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">{link.title}</td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-blue-500 hover:underline">
                <a href={link.url}>{link.url}</a>
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-red-500 hover:text-red-700">
                <button onClick={() => handleDelete(link.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
