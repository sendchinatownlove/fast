export default function sortMerchants(merchantsArray) {
  // get zip codes
  const zipCodes = {};

  for (let merchant of merchantsArray) {
    const address = merchant["address"];
    const zipCode = address.split(" ").at(-1);

    if (Object.keys(zipCodes).includes(zipCode)) {
      zipCodes[zipCode].push(merchant);
    } else {
      zipCodes[zipCode] = [merchant];
    }
  }

  // TODO: Randomly sort zip codes + merchants. Make 2 arrays of random integers
  // One will be for the indexes of zip codes. The other will be for merchants.

  // for each zip code, randomly sort restaurants and append to result
  const result = [];

  for (let zipCode of Object.keys(zipCodes)) {
    const merchants = zipCodes[zipCode];

    for (let merchant of merchants) {
      result.push(merchant);
    }
  }

  return result;
}
