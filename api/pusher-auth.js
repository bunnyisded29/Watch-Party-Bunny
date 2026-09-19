const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const body = req.body || {};

  if (
    !body.socket_id ||
    !body.channel_name ||
    !body.channel_name.startsWith("presence-room-")
  ) {
    return res.status(403).json({
      error: "Invalid room"
    });
  }

  let userInfo = {};

  try {
    userInfo = JSON.parse(body.user_info || "{}");
  } catch (_) {
    userInfo = {};
  }

  const userId =
    body.user_id ||
    Math.random().toString(36).slice(2, 10);

  const userName = String(
    userInfo.name || "Guest"
  ).slice(0, 32);

  const authResponse = pusher.authorizeChannel(
    body.socket_id,
    body.channel_name,
    {
      user_id: userId,
      user_info: {
        name: userName
      }
    }
  );

  return res.status(200).json(authResponse);
};
