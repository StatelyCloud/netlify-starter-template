"use server";

import { keyPath } from "@stately-cloud/client";
import { statelyClient } from "./stately";

const profileSlug = process.env.PROFILE_SLUG || "default";

export async function fetchProfileWithLinks() {
  const links = [];
  let profile = null;
  const iter = statelyClient.beginList(
    keyPath`/p-${profileSlug}`
  );
  for await (const item of iter) {
    if (statelyClient.isType(item, "Link")) {
      links.push(item);
    } else if (statelyClient.isType(item, "Profile")) {
      profile = item;
    }
  }
  return { profile, links };
}

export async function createLink(formData: FormData) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const emoji = formData.get("emoji") as string;
  const link = statelyClient.create("Link", {
    title,
    url,
    profileId: profileSlug,
    emoji,
  });
  await statelyClient.put(link);
}

export async function deleteLink(id: bigint) {
  await statelyClient.del(keyPath`/p-${profileSlug}/l-${id}`);
}

export async function renameProfile(newFullName: string) {
  const profile = statelyClient.create("Profile", {
    id: profileSlug,
    fullName: newFullName,
  });
  await statelyClient.put(profile)
}
