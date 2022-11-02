"use strict";

const { getData } = require("../utility/linkAsync");

let latestRegisterClientsHash = null;
let latestClientMatchHash = null;
async function registerClientHash(link, clientId, hash) {
  return new Promise(async (resolve, reject) => {
    let currentClients = {};
    if (latestRegisterClientsHash) {
      currentClients = await getLatestRegisteredClientsOrderBookHash(link);
    }
    link.put(
      { v: JSON.stringify({ ...currentClients, [clientId]: hash }) },
      (err, hash) => {
        if (err) {
          reject(err);
        }
        latestRegisterClientsHash = hash;
        resolve(hash);
      }
    );
  });
}

async function matchOrderHashForClient(link, clientsMatchTable) {
  return new Promise(async (resolve, reject) => {
    link.put({ v: JSON.stringify(clientsMatchTable) }, (err, hash) => {
      if (err) {
        reject(err);
      }
      latestClientMatchHash = hash;
      resolve(hash);
    });
  });
}

async function getLatestRegisteredClientsOrderBookHash(link) {
  const { v: clientTable } = await getData(link, latestRegisterClientsHash);
  return JSON.parse(clientTable);
}
async function getLatestMatchOrder(link) {
  const { v: clientTable } = await getData(link, latestClientMatchHash);
  return JSON.parse(clientTable);
}
module.exports = {
  registerClientHash,
  getLatestRegisteredClientsOrderBookHash,
  getLatestMatchOrder,
  matchOrderHashForClient,
};
