import { itemType, string, uint } from "@stately-cloud/schema";

export const Profile = itemType("Profile", {
  keyPath: "/p-:id",
  fields: {
    id: { type: string },
    fullName: { type: string },
  },
});

export const Link = itemType("Link", {
  keyPath: "/p-:profile_id/l-:id",
  fields: {
    id: { type: uint, initialValue: "sequence" },
    profile_id: { type: string },
    title: { type: string },
    url: { type: string },
    emoji: { type: string, required: false },
  },
});
