# Together — Private PC Watch Party

A small private watch-party app with:

- Vercel for the website + Pusher auth API
- Pusher Channels for private room membership and real-time signaling
- Your own PC for the movie library and HTTP range streaming
- Synchronized movie playback
- Browser-to-browser screen sharing using WebRTC

## Project structure

```text
watchparty/
├── public/index.html
├── api/config.js
├── api/pusher-auth.js
├── server/server.js
├── server/package.json
├── server/media/          ← put your movie files here
├── package.json
├── vercel.json
└── README.md
```

## 1. Pusher

Create a Pusher Channels app and enable **Client Events**. Put these four values into Vercel Environment Variables:

- `PUSHER_APP_ID`
- `PUSHER_KEY`
- `PUSHER_SECRET`
- `PUSHER_CLUSTER`

Keep the secret only in Vercel.

## 2. PC media server

Install Node.js on the PC that stores your movies.

```bash
cd server
npm install
node server.js
```

Put movies inside `server/media/`. The server scans the folder recursively.

It supports common files including MP4, M4V, WebM, MOV, MKV, AVI and TS. Browser codec support still depends on the browser/device.

### Secure access

Do **not** directly port-forward TCP port 8787 to the public internet. For a remote friend, expose the media server through a secure HTTPS tunnel/VPN/reverse proxy. The Vercel page is HTTPS, so an ordinary `http://` PC URL can be blocked as mixed content.

After you have a secure media-server URL, open the browser console on the watch-party page and set:

```js
localStorage.setItem('MEDIA_SERVER','https://YOUR-SECURE-PC-SERVER')
```

Then reload the page and use **PC Library**.

## 3. Screen sharing

Inside a room, click **Share Screen**. The browser will ask which screen/window/tab to share. The stream is sent peer-to-peer with WebRTC and Pusher is used only for signaling.

Important:

- Screen sharing requires browser permission and a secure HTTPS page.
- The person sharing remains in control of their screen.
- Screen-share mode is a live stream; the movie playback sync controls apply to the PC-library movie mode.
- STUN is included for direct peer connections. Some networks require a TURN server for WebRTC to connect reliably. TURN can be added later if needed.
- Some DRM/protected content may not be capturable by the browser/OS.
- Remote audio availability depends on the browser, OS, and the share source's audio-capture support.

## 4. Deploy from GitHub

1. Create a new GitHub repository.
2. Upload **everything inside this folder**, including `public`, `api`, `server`, `package.json`, and `vercel.json`.
3. Import the GitHub repository into Vercel.
4. Add the four Pusher environment variables.
5. Deploy.

The GitHub repository does **not** contain your movie files unless you put them there. Keep movies on your PC's `server/media/` folder.

## 5. Use it

1. Open the deployed Vercel URL.
2. Create a room and copy the invite link.
3. The other person opens the link and joins.
4. For PC movies, configure `MEDIA_SERVER` and choose **PC Library**.
5. For screen sharing, choose **Share Screen**.

Use only media you are allowed to play/share.
