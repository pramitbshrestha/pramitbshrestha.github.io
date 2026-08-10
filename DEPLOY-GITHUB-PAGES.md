# Publishing to GitHub Pages — Step by Step

This project already includes everything needed for GitHub Pages: a build config that
adapts its base path automatically, a fix for client-side routing on static hosting, and
a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys on
every push. You just need to create the repo, push the code, and flip one setting.

---

## Option A — Quickest: project site at `username.github.io/repo-name/`

Use this if you don't have a custom domain yet. Your site will be live at something like
`https://yourusername.github.io/subechhya-bag-pasal/`.

### 1. Create the GitHub repository
1. Go to [github.com/new](https://github.com/new).
2. Name it anything you like, e.g. `subechhya-bag-pasal`.
3. Set it to **Public** (required for free GitHub Pages).
4. Leave "Initialize with README" **unchecked** — this project already has one.
5. Click **Create repository**.

### 2. Push the project to GitHub
From inside the project folder on your computer:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. That's it — no branch or folder to pick. GitHub will now use the workflow already
   included in this project.

### 4. Watch it deploy
1. Go to the **Actions** tab in your repo.
2. You'll see a "Deploy to GitHub Pages" run in progress (it starts automatically after
   your push). Wait for it to finish (usually 1–2 minutes).
3. Once it's green, go back to **Settings → Pages** — your live URL is shown at the top,
   e.g. `https://yourusername.github.io/subechhya-bag-pasal/`.

### 5. Confirm routing works
Visit a few different pages directly (not just by clicking around) to confirm deep links
survive a refresh, e.g.:
- `https://yourusername.github.io/subechhya-bag-pasal/products`
- `https://yourusername.github.io/subechhya-bag-pasal/about`

Refresh each page. If you see the site (not a GitHub 404), the routing fix is working.

---

## Option B — Recommended for a real business site: custom domain

Use this once you have (or plan to buy) a domain, e.g. `subechhyabag.com`. This avoids
the `/repo-name/` subpath entirely and looks more professional. You can start with
Option A and switch to this later without redoing anything else.

### 1. Do steps 1–3 from Option A first
Get the site live at `username.github.io/repo-name/` before attaching a domain — it's
easier to confirm everything works before adding DNS into the mix.

### 2. Add a `CNAME` file to the project
Create a file at `public/CNAME` (no file extension) containing just your domain:

```text
subechhyabag.com
```

(Use `www.subechhyabag.com` instead if you want the `www` version to be primary.)

Commit and push this file:

```bash
git add public/CNAME
git commit -m "Add custom domain"
git push
```

The included GitHub Actions workflow automatically detects this file and rebuilds the
site with base path `/` instead of `/repo-name/` — no other changes needed.

### 3. Point your domain's DNS at GitHub Pages

At your domain registrar (wherever you bought the domain), add these records:

**For an apex/root domain (`subechhyabag.com`):**

| Type | Name | Value |
|------|------|-------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

**For a `www` subdomain (`www.subechhyabag.com`):**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `yourusername.github.io` |

(You can set up both and use GitHub's redirect option in the next step to send one to
the other.)

### 4. Confirm the domain in GitHub
1. Go to **Settings → Pages** in your repo.
2. Under **Custom domain**, enter your domain and click **Save**.
3. Wait for the DNS check to pass (can take a few minutes to 24 hours depending on your
   registrar).
4. Once verified, check **Enforce HTTPS** — GitHub issues a free SSL certificate
   automatically.

### 5. Update the site's own config to match
Open `src/data/site.json` and update:

```json
"website": {
  "domain": "subechhyabag.com",
  "url": "https://subechhyabag.com"
}
```

Commit and push — this keeps SEO metadata (canonical URLs, Open Graph tags, structured
data) pointing at your real domain instead of the placeholder.

---

## Updating the Site After Launch

Every time you push a content or code change to the `main` branch, the GitHub Actions
workflow rebuilds and redeploys automatically — nothing manual to run. You can watch
progress under the **Actions** tab.

To preview changes locally before pushing:

```bash
npm install
npm run dev
```

## Troubleshooting

**Site shows a blank page.**
Check the browser console for asset 404s. This usually means the base path is wrong —
confirm you didn't manually set `VITE_BASE_PATH` somewhere that conflicts with the
workflow's auto-detection.

**Refreshing a page like `/products` shows a GitHub 404 page (not your site's 404 page).**
This means `public/404.html` wasn't deployed, or GitHub Pages isn't actually serving
from GitHub Actions. Re-check Settings → Pages → Source is set to **GitHub Actions**
(not "Deploy from a branch").

**Custom domain shows "Domain's DNS record could not be retrieved."**
DNS changes can take time to propagate. Wait a while and click **Save** again on the
Pages settings — this is common and usually resolves within a few hours.

**Workflow fails on the "Build" step.**
Check the Actions log — it's almost always a content validation error (see the terminal
output for which `src/data/*.json` file and field). Fix it locally, confirm with
`npm run validate-content`, then push again.
