# PC Media Server

This folder is the local movie server for Together.

## Run

```bash
npm install
node server.js
```

It listens on `0.0.0.0:8787` by default.

Environment variables:

- `PORT` — optional, defaults to `8787`
- `MEDIA_ROOT` — optional, defaults to `./media`

Put supported media files in `media/`.

Do not expose port 8787 directly to the public internet. Use a secure HTTPS tunnel, VPN or reverse proxy.
