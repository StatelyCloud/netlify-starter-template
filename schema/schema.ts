import { itemType, string, uint } from "@stately-cloud/schema";

export const Profile = itemType("Profile", {
  keyPath: "/p-:id",
  fields: {
    id: { type: string, fieldNum: 1 },
    fullName: { type: string, fieldNum: 2 },
  },
});

export const Link = itemType("Link", {
  keyPath: "/p-:profile_id/l-:id",
  fields: {
    id: { type: uint, fieldNum: 1, initialValue: "sequence" },
    profile_id: { type: string, fieldNum: 2 },
    title: { type: string, fieldNum: 3 },
    url: { type: string, fieldNum: 4 },
    emoji: { type: string, fieldNum: 5, required: false },
  },
});
