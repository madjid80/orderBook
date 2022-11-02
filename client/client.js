"use strict";

const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const {
  placeOrder,
  notifyOrderEngineAboutNewOrder,
} = require("./services/orderBook");
const { requestAsync } = require("./utility/peerAsync");

const link = new Link({
  grape: `http://${process.env.GRAPE_NODE}`,
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

peer.request(
  "register_clients",
  process.env.CLIENT_ID,
  { timeout: 10000 },
  (error, result) => {
    if (error) {
      console.error(error);
      process.exit(-1);
    }
    console.log(result);
  }
);

//update Order book
setInterval(async () => {
  const isClientLock = await requestAsync(peer, "lock_clients", {
    clientId: process.env.CLIENT_ID,
  });

  if (!isClientLock.isLock) {
    //Check which order has been sold/bought
    const matchedOrders = await requestAsync(peer, "get_match_orders", {
      clientId: process.env.CLIENT_ID,
    });
    console.log(matchedOrders);
    link.put(
      {
        v: JSON.stringify(placeOrder(matchedOrders)),
      },
      notifyOrderEngineAboutNewOrder.bind(this, peer)
    );
  }
}, 1000);
