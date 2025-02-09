const WSWrapper = require("wstest");
const WebSocket = require("ws");
const clientConfig = require("./fuzzingclient.json");

require("./Autobahn");

clientConfig.servers.forEach(({ url, agent }) => {
  const socket = new WebSocket(url);
  socket.onerror = ({ error }) => {
    const { code } = error;
    if (code !== "DEPTH_ZERO_SELF_SIGNED_CERT") {
      console.error(error);
      process.exit(1);
    }
  };
  new WSWrapper(socket);
  console.log(agent);
});

setTimeout(() => process.exit(0), 5000);
