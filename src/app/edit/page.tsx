"use client";

import { fetchProfileWithLinks, createLink, deleteLink } from '@/lib/actions';
import LinksTable from '@/components/LinksTable';
import FullNameEditor from '@/components/FullNameEditor';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Profile, Link } from '@/lib/generated';
import NextLink from "next/link";

const isEditable = process.env.NEXT_PUBLIC_EDITABLE !== 'false';

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { profile, links } = await fetchProfileWithLinks();
      setProfile(profile ?? null);
      setLinks(links);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreateLink = async (formData : FormData, form: HTMLFormElement) => {
    await createLink(formData);
    const { links: updatedLinks } = await fetchProfileWithLinks();
    setLinks(updatedLinks);
    form.reset();
  };

  const handleDeleteLink = async (id: bigint) => {
    await deleteLink(id);
    const { links: updatedLinks } = await fetchProfileWithLinks();
    setLinks(updatedLinks);
  };

  if (!isEditable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <div className="flex justify-start mb-4">
            <NextLink href="/" className="text-blue-500 hover:underline">
              &larr; Return to Profile
            </NextLink>
          </div>
          <div className="text-center text-gray-500">Editing is disabled.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <div className="flex justify-start mb-4">
          <NextLink href="/" className="text-blue-500 hover:underline">
            &larr; Return to Profile
          </NextLink>
        </div>
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/thispersondoesnotexist.jpg"
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full mb-4"
          />
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <span>Loading...</span>
            </div>
          ) : (
            <FullNameEditor initialFullName={profile?.fullName || ''} />
          )}
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading links...</div>
        ) : (
          <LinksTable links={links} onDeleteLink={handleDeleteLink} />
        )}
        <form onSubmit={(e) => { e.preventDefault(); handleCreateLink(new FormData(e.target as HTMLFormElement), e.target as HTMLFormElement); }} className="mt-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
            <input type="url" name="url" id="url" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">Emoji</label>
            <select name="emoji" id="emoji" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
              <option value="🌐">🌐</option>
              <option value="📧">📧</option>
              <option value="📱">📱</option>
              <option value="📸">📸</option>
              <option value="🎥">🎥</option>
              <option value="🎵">🎵</option>
              <option value="🎤">🎤</option>
              <option value="🎨">🎨</option>
              <option value="🛒">🛒</option>
              <option value="💼">💼</option>
              <option value="📚">📚</option>
              <option value="📰">📰</option>
              <option value="🎮">🎮</option>
              <option value="🏆">🏆</option>
              <option value="🏅">🏅</option>
              <option value="🎓">🎓</option>
              <option value="💡">💡</option>
              <option value="📅">📅</option>
              <option value="📍">📍</option>
              <option value="🔗">🔗</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors">Add Link</button>
        </form>
      </div>
    </div>
  );
}