# Deploy and rollback

Production is the Vercel project `jivancevics-projects/konoba-maha`, served at https://konobamaha.com.

## Deploy

A merge to `main` deploys. Vercel builds the merge commit and promotes it to production on its own. Every other branch gets a preview deployment, linked from the PR's `Vercel` check.

## Check after a merge

```bash
vercel ls konoba-maha
```

The newest `Production` row must be `Ready` and belong to the merge commit. Then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://konobamaha.com/hr
curl -s -o /dev/null -w "%{http_code}\n" https://konobamaha.com/en
```

Both must print `200`.

## Rollback

Roll back first, diagnose after.

```bash
vercel ls konoba-maha
vercel rollback <deployment-url>
```

Take `<deployment-url>` from the last good `Production` row of `vercel ls konoba-maha` (the one before the bad merge). This puts that deployment back on https://konobamaha.com within seconds.

Then open a revert PR for the bad commit, so `main` matches production again. After `vercel rollback`, Vercel stops auto-promoting new `main` builds until a deployment is promoted again: once the revert has built, run `vercel promote <deployment-url>` on it.
