async function getData(linkInstance, hash) {
  return new Promise((resolve, reject) => {
    linkInstance.get(hash, (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
}
async function putData(linkInstance, data) {
  return new Promise((resolve, reject) => {
    linkInstance.put(
      {
        v: JSON.stringify(data),
      },
      (error, hash) => {
        if (error) {
          reject(error);
        }
        resolve(hash);
      }
    );
  });
}

module.exports = {
  getData,
  putData,
};
