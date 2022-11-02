const tokens = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"];
function placeOrder() {
  return {
    number: Math.floor(Math.random() * 1000),
    price: Math.floor(((Math.random() * 10) % 4) * 100),
    token: tokens[Math.floor(Math.random() * 10)],
  };
}

function handleOrderResponse(error, orderExchangeResult) {
  if (error) {
    console.error(error);
    process.exit(-1);
  }
  //   console.log(orderExchangeResult);
}
function notifyOrderEngineAboutNewOrder(peer, error, hash) {
  if (error) {
    console.log(error);
  }

  peer.request(
    "order_book_request",
    { hash, clientId: process.env.CLIENT_ID },
    { timeout: 10000 },
    handleOrderResponse
  );
}
module.exports = {
  placeOrder,
  notifyOrderEngineAboutNewOrder,
};
