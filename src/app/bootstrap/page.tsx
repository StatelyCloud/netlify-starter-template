"use server";

import { createLink, renameProfile } from "@/lib/actions";
import NextLink from "next/link";
import { redirect } from "next/navigation";

const isEditable = process.env.NEXT_PUBLIC_EDITABLE !== "false";

export default async function Page() {
  const sampleData = {
    profile: {
      fullName: "Ada Lovelace",
    },
    links: [
      {
        title: "Wikipedia page",
        url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
        emoji: "📚",
      },
      {
        title: "Adafruit",
        url: "https://www.adafruit.com/",
        emoji: "🛠",
      },
      {
        title: "Ada Lovelace, the First Tech Visionary",
        url: "https://www.newyorker.com/tech/annals-of-technology/ada-lovelace-the-first-tech-visionary",
        emoji: "📰",
      },
    ],
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

  await renameProfile(sampleData.profile.fullName);
  await Promise.all(sampleData.links.map(async (link) => {
    const formData = new FormData();
    formData.append("title", link.title);
    formData.append("url", link.url);
    formData.append("emoji", link.emoji);
    await createLink(formData);
  }));

  redirect("/");
}
