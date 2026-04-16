# Backend README — Environment & Secrets

This README explains the environment variables required by the backend, how to obtain or generate each value, and how to use the included `encrypt-email.js` script. It also confirms where the admin/dev UI stores encrypted credentials.

Important: never commit secrets (`.env.local`, `.env`) to Git. This project includes `.gitignore` to prevent accidental commits.

## Environment variables (in `.env.local`)

- `GOOGLE_CLIENT_ID`
  - Create in Google Cloud Console: APIs & Services → Credentials → Create Credentials → OAuth client ID (Web application).
  - Add Authorized redirect URIs: `http://localhost:3001/api/auth/callback/google` (and your production URL `/api/auth/callback/google`).

- `GOOGLE_CLIENT_SECRET`
  - Generated alongside the client ID in Google Cloud Console. Keep secret and rotate if leaked.

- `NEXTAUTH_URL`
  - The public URL where this backend is reachable. For local dev: `http://localhost:3001`.

- `NEXTAUTH_SECRET`
  - A strong secret used by `next-auth`. Generate with Node or OpenSSL:

  PowerShell:

  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

  macOS/Linux:

  ```bash
  openssl rand -hex 32
  ```

- `EMAIL_AES_KEY_HEX`
  - 32-byte AES key as hex (64 hex characters) used to encrypt admin email and SMTP app password. Generate similarly:

  ```bash
  openssl rand -hex 32
  ```

  Store this value in Vercel or your deployment platform environment variables (do not commit it).

- `BACKEND_IDENTIFIER`
  - An internal identifier used by the backend. Treat as secret if it grants access. If you need to generate a new one, produce a long random hex string (e.g., `openssl rand -hex 64`).

- `ADMIN_EMAIL`
  - The admin Google email allowed to sign into the admin UI. Must match the Google account used with OAuth.

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - For Gmail:
    - `SMTP_HOST=smtp.gmail.com`
    - `SMTP_PORT=587`
    - `SMTP_USER` = your Gmail address
    - `SMTP_PASS` = **App Password** (not your Google account password)
  - To create a Gmail App Password:
    1. Enable 2-Step Verification on the Google account.
    2. Go to Security → App passwords → select "Mail" and generate a password.
    3. Copy the generated 16-character app password and use it as `SMTP_PASS`.

## Using `scripts/encrypt-email.js`

- Purpose: produce AES-GCM encrypted hex strings for the admin email and the SMTP app password so they can be stored encrypted in the admin panel.
- The script no longer contains a hard-coded key. You must provide `EMAIL_AES_KEY_HEX` in your environment before running it.

Examples

PowerShell (Windows):

```powershell
$env:EMAIL_AES_KEY_HEX = "$(node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\")"
node .\scripts\encrypt-email.js youremail@example.com
```

bash (macOS / Linux):

```bash
EMAIL_AES_KEY_HEX=$(openssl rand -hex 32) node scripts/encrypt-email.js youremail@example.com
```

The script prints a `DEV_EMAIL_ENCRYPTED=` hex value which you can:
- Paste into `.env.local` as `DEV_EMAIL_ENCRYPTED` (local dev only; do not commit).
- Or paste into the Admin panel under *Encrypted Credentials* → *Encrypted Email* / *Encrypted App Password* (the admin UI saves encrypted values to `data/settings.json`).

## Where the admin/dev UI stores values

- The admin panel (`/app/dev`) calls `/api/admin/settings`. That API reads/writes `data/settings.json` on the filesystem (see `app/api/admin/settings/route.ts`).
- The admin UI does NOT create or modify `.env.local`. It stores encrypted values in `data/settings.json` (server-side). So using the admin panel will not alter your repo's `.env.local` file.

## Security recommendations before publishing to GitHub / deploying to Vercel

- Remove any committed `.env.local` from the repository history (use `git filter-repo` or BFG), then rotate all exposed secrets (Google client secret, NEXTAUTH_SECRET, SMTP app password, AES key, BACKEND_IDENTIFIER).
- Add secrets to Vercel's Environment Variables (Production/Preview/Development) — do not push `.env` files.
- Limit CORS origins in production: the project currently contains permissive `Access-Control-Allow-Origin: '*'` in some API routes; set an allow-list for production.
- Keep the AES key and NEXTAUTH_SECRET secret — store in your deployment platform's secret store.

If you want, I can generate example commands to purge `.env.local` from git history and prepare a safe commit that removes the file from the index. I can also prepare the exact env variable values format for Vercel. Let me know which you'd like next.
