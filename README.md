# 04-react-query

Movie search with React, TypeScript, Axios, TanStack Query and React Paginate.
Based on the previous movie assignment; component CSS comes from https://github.com/goitacademy/react-movies-styles with the assignment pagination styles.

## Run locally

1. Open this project folder (the one containing package.json).
2. Copy `.env.example` to `.env` and fill `VITE_TMDB_TOKEN` with your TMDB API Read Access Token. The same token from assignment 03 works. Do not add Bearer to its value.
3. Run `npm ci` and `npm run dev`.
4. Open the local URL and search for Batman.

## Validation

- `npm run build`: TypeScript and production build.
- `npm run format:check`: formatting.
- Search for Batman, change pages: different cards, highlighted current page.
- New query resets page to 1. Previous results disappear while loading.
- Empty query triggers a toast; no matches triggers a toast; request failure shows an error.
- Open a movie, close with X, Escape, or backdrop; scrolling restores.
- Search again after an error to recover.

QueryClientProvider is configured in src/main.tsx; useQuery in App owns server data and request states. Query and page form the cache key. AbortSignal cancels obsolete requests. React Paginate uses controlled forcePage. TMDB's valid page limit is 500. The API field is total_pages (the assignment prose has a total_page typo).
The React Paginate import supports Vite 8's default interop and the direct component export.

## Publish

Create a separate GitHub repository named `04-react-query`; upload the contents of this folder without `.env`, `node_modules`, or `dist`.
Import it into Vercel: Vite, `npm run build`, output `dist`.
Add Environment Variable: key `VITE_TMDB_TOKEN`, value your long TMDB token only. Deploy; if added later, Redeploy.
Check search, pagination, and modal on the live site. Submit the GitHub URL plus permanent production URL from Domains ending in `.vercel.app`, not the dashboard URL. Wait 5 minutes after the last push.

No token is bundled. Real TMDB checks require your token. VITE variables become part of the browser build.
