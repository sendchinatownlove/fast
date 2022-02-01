/**
 * Sorts a list of merchants by using the zip codes as natural clusters. Algorithm is as follows:
 * Input is an array of merchants
 * 1. Group merchants by zip codes
 * 2. Randomly sort the zip codes (can generate array of random numbers from 1 to number of zip codes)
 * 3. For each zip code, randomly sort the merchants
 * 4. Add the merchant.
 *
 * @param {*} merchantsArray
 * @returns array of merchants
 */
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
