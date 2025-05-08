import { createClient } from "./generated/index.js";

if (!process.env.STATELY_ACCESS_KEY) {
  throw new Error("Missing STATELY_ACCESS_KEY");
}
if (!process.env.STATELY_STORE_ID) {
  throw new Error("Missing STATELY_STORE_ID");
}

export const statelyClient = createClient(
  Number(process.env.STATELY_STORE_ID),
  {
    region: "us-west-2",
  }
);
