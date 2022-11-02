async function requestAsync(peer, topic, payload) {
  return new Promise((resolve, reject) => {
    peer.request(topic, payload, { timeout: 10000 }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}
module.exports = {
  requestAsync,
};
