import { fetchProfileWithLinks } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const isEditable = process.env.NEXT_PUBLIC_EDITABLE !== 'false';

export default async function Page() {
  const { profile, links } = await fetchProfileWithLinks();
  const defaultEmoji = "🤷‍♂️";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <div className="flex flex-col items-center">
          <Image
            src="/thispersondoesnotexist.jpg"
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold mb-6">{profile?.fullName}</h2>
        </div>
        <div>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="flex items-center w-full text-center py-3 px-4 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                  style={{
                    boxShadow:
                      "0 4px 6px -1px rgba(255, 0, 150, 0.5), 0 2px 4px -1px rgba(255, 0, 150, 0.3)",
                  }}
                >
                  <span className="mr-2">{link.emoji || defaultEmoji}</span>
                  <span className="flex-1">{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {isEditable && (
        <div className="mt-4 text-center">
          <Link
            href="/edit"
            className="text-gray-500 text-xs"
          >
            edit this page
          </Link>
        </div>
        )}
      </div>
    </div>
  );
}
