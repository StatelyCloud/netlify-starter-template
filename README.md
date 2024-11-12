# Netlify Starter Template

This is a sample NextJS webapp that uses StatelyDB.

*NOTE:* You MUST set up your StatelyDB store and schema following the instructions below before deploying to Netlify!

## Features

- Uses a [sample schema](./schema/schema.ts) that defines the `Profile` and `Link` Item types, and [related generated typescript types](./src/lib/generated).
- Displays a profile page and a collection of links. By default the site is not editable, which you can change by updating the `NEXT_PUBLIC_EDITABLE` environment variable to `true`.

## Prerequisites

- Node.js 14.x or later
- Netlify account
- Stately Cloud account and access to a StatelyDB Store

# Deploying to Netlify

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Visit the Stately Cloud console at https://console.stately.cloud and grab your credentials and Store ID. If you don't have one yet, request one.
4. Create a new Netlify site:
   ```
   netlify sites:create
   ```
5. Configure environment variables:
   ```
   netlify env:set NEXT_PUBLIC_EDITABLE true
   netlify env:set PROFILE_SLUG default
   netlify env:set STATELY_STORE_ID your_store_id
   netlify env:set STATELY_CLIENT_ID your_client_id
   netlify env:set STATELY_CLIENT_SECRET your_client_secret
   ```
4. Deploy to Netlify!
   ```
   netlify deploy --build
   ```

# Local Development

## StatelyDB Schema Setup

You only need to follow these steps if you want to make changes to the Schema locally.

1. Install the Stately CLI:
   ```
   curl -sL https://stately.cloud/install | sh
   ```
2. Log in to your Stately account:
   ```
   stately login
   ```
3. Navigate to the `schema` directory:
   ```
   cd schema
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Publish the schema:
   ```
   stately schema put -m "my schema change message" --schema-id <your_schema_id> schema.ts
   ```
6. Generate the TypeScript client:
   ```
   stately schema generate --language ts --schema-id <your_schema_id> --version <schema_version> ../src/lib/generated
   ```

## Configuration Options

* If you want the site to be editable, set the environment variable `NEXT_PUBLIC_EDITABLE` to `true`. You probably don't want everyone on the Internet to be able to edit your page, so use this with caution -- it's just an example!
* If you want to change the profile photo, swap out `thispersondoesnotexist.jpg` for something else.

## Development Server

1. For local development, create a `.env.local` file in the root directory with the following content:
   ```
   STATELY_CLIENT_ID=your_client_id
   STATELY_CLIENT_SECRET=your_client_secret
   STATELY_STORE_ID=12345
   PROFILE_SLUG=default
   NEXT_PUBLIC_EDITABLE=false
   ```
   Replace `your_client_id`, `your_client_secret`, and `12345` with your actual StatelyDB credentials and store ID.  Replace `your_base_url` with the base url of your app (e.g. `http://localhost:3000` or `https://statelydb-demo.netlify.app`).
   
   See `.env.local.example` for more details on the other configuration options.


2. Run the development server:

   ```
   netlify dev
   ```
