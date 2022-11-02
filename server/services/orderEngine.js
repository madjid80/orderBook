"use strict";

const {
  getLatestRegisteredClientsOrderBookHash,
  matchOrderHashForClient,
} = require("./registerClients");

const { putData } = require("../utility/linkAsync");
const tokens = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"];
function randomMatch() {
  return {
    number: Math.floor(Math.random() * 1000),
    price: Math.floor(((Math.random() * 10) % 4) * 100),
    token: tokens[Math.floor(Math.random() * 10)],
  };
}
var lockClients = [];
function isClientLock(clientId) {
  return lockClients.indexOf(clientId) !== -1;
}
async function runOrderBookEngine(link) {
  const clients = await getLatestRegisteredClientsOrderBookHash(link);
  console.log(Object.keys(clients));
  lockClients = Object.keys(clients);
  //TODO implement exchange match here

  const client1 = await putData(link, randomMatch());
  const client2 = await putData(link, randomMatch());

  await matchOrderHashForClient(link, { 1: client1, 2: client2 });

  lockClients = [];
}
module.exports = { isClientLock, runOrderBookEngine };
