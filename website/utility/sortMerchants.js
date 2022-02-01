/**
 * Sorts a list of merchants by using the zip codes as natural clusters. Algorithm is as follows:
 * Input is an array of merchants
 * 1. Group merchants by zip codes.
 * 2. Randomly sort the zip codes.
 * 3. For each zip code, randomly sort the merchants
 * 4. Add the merchant.
 *
 * @param {*} merchantsArray
 * @returns array of merchants
 */
export default function sortMerchants(merchantsArray) {
  const zipcodesToMerchants = {};

  for (let merchant of merchantsArray) {
    const address = merchant["address"];
    const zipcode = address.split(" ").at(-1);

    if (Object.keys(zipcodesToMerchants).includes(zipcode)) {
      zipcodesToMerchants[zipcode].push(merchant);
    } else {
      zipcodesToMerchants[zipcode] = [merchant];
    }
  }

  const result = [];
  const shuffledZipcodes = shuffle(Object.keys(zipcodesToMerchants));

  for (let zipcode of shuffledZipcodes) {
    const shuffledMerchants = shuffle(zipcodesToMerchants[zipcode]);

    for (let merchant of shuffledMerchants) {
      result.push(merchant);
    }
  }

  return result;
}

// https://stackoverflow.com/questions/962802
function shuffle(array) {
  var tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array;
}
