"use strict";

const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const {
  isClientLock,
  runOrderBookEngine,
} = require("./services/orderEngine.js");
const {
  registerClientHash,
  getLatestMatchOrder,
} = require("./services/registerClients.js");
const { getData } = require("./utility/linkAsync");

const link = new Link({
  grape: `http://${process.env.GRAPE_NODE}`,
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

link.announce("register_clients", service.port, { interval: 100 });
link.announce("order_book_request", service.port, { interval: 100 });
link.announce("lock_clients", service.port, { interval: 100 });
link.announce("get_match_orders", service.port, { interval: 100 });

service.on("request", async (rid, key, payload, handler) => {
  try {
    if (key === "register_clients") {
      await registerClientHash(link, payload, "");
      handler.reply(null, "registered");
    }
    if (key === "order_book_request") {
      const hash = payload.hash;
      const clientId = payload.clientId;
      console.log(`${clientId} is not lock`);
      await registerClientHash(link, clientId, hash);
      //TODO only send back hash with new order book
      const latestHashData = await getData(link, hash);
      handler.reply(null, { version: hash, latestHashData });
    }
    if (key === "lock_clients") {
      const clientId = payload.clientId;
      const response = isClientLock(clientId);
      handler.reply(null, { isLock: response });
    }
    if (key === "get_match_orders") {
      const clientId = payload.clientId;
      const clientMatchedOrder = await getLatestMatchOrder(link, clientId);
      handler.reply(null, clientMatchedOrder);
    }
  } catch (error) {
    console.log(error);
    handler.reply(error, null);
  }
});
setInterval(async () => {
  await runOrderBookEngine(link);
}, 600);
