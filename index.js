const axios = require("axios");
const fs = require("fs");

const ethWallet = require("ethereumjs-wallet");

const main = async () => {
  let addressData = ethWallet.default.generate();
  let Private_key = addressData.getPrivateKeyString();
  let Address = addressData.getAddressString();
  // let Address = "0x4bF8ad1d8826d618cfb77053BEc29AA0f98509bA";
  axios
    .get(
      "https://api.etherscan.io/api?module=account&action=balance&address=" +
        Address +
        "&tag=latest&apikey=PKXDICV99B1S41NV7BBGISERQZN1Y6XWFA"
    )
    .then(function (response) {
      // handle success
      if (response.data.result > 0) {
        let res =
          "Private_key:" + Private_key + "Balance:" + response.data.result;
        fs.appendFile("result.txt", res, function (err) {
          if (err) {
            return console.log(err);
          }
        });
      }
      console.log("Address:", Address);
      console.log("Private_key", Private_key);
      setTimeout(() => {
        main();
      }, "500");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

main();
