# Project Migration & SEO Optimization Task

## Context
I have successfully migrated the website for **Konoba Maha** from a WordPress cPanel hosting to a **Next.js** application hosted on **Vercel**.
The domain remains the same: `konobamaha.com`.

## Current Issues
1. **Broken Legacy Links:** Google search results still point to old WordPress URLs, specifically `konobamaha.com/hr`. Since the new Next.js app doesn't have a `/hr` route (it's likely a single-page app or uses a different i18n structure), users are hitting 404 errors.
2. **SEO Transition:** I need to ensure that the SEO authority from the old site is transferred to the new one and that the new site is fully optimized for search engines.

## Technical Tasks for Claude

### 1. Permanent Redirects (301)
* Implement a global redirect strategy in `next.config.js` or via Vercel Middleware.
* **Specific Redirect:** Map `konobamaha.com/hr` and any other old `/hr/*` paths to the root `/` or the appropriate new section.
* Ensure all legacy `.php` or WordPress-style URLs redirect gracefully to their new counterparts.

### 2. SEO Enhancement
* **Metadata API:** Implement dynamic metadata for all pages (Title, Description, OpenGraph, Twitter Cards).
* **Sitemap & Robots.txt:** Generate a `sitemap.xml` and `robots.txt` using `next-sitemap` or manual Next.js App Router metadata files.
* **Structured Data (JSON-LD):** Add `Restaurant` and `LocalBusiness` schema to the homepage to help Google understand opening hours, location (Korčula), and specialty (Peka).
* **Semantic HTML:** Review the components to ensure proper use of `<h1>` through `<h6>`, `alt` tags for images, and `<section>` tags.
* **Canonical Tags:** Ensure canonical URLs are set to avoid duplicate content issues.

### 3. Performance & Core Web Vitals
* Check image optimization (Next/Image).
* Ensure font loading is optimized.

## Goal
The goal is to eliminate 404 errors for returning visitors/Google users and to rank higher for keywords like "best restaurant Korčula", "Peka Korčula", and "Konoba Maha".