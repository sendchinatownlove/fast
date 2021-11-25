import Airtable from "airtable";
import {
  getLatLongFromGeocache,
  getAddressFromGeocache,
} from "./utility/geocache.js";

const apiKey = process.env["API_KEY"];
Airtable.configure({ apiKey: apiKey });

export async function main(req, res) {
  let list = [];
  await base("All Chinatown Merchants")
    .select({
      view: "SCL Merchants",
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const merchant = {
          name: record.get("Name"),
          address: getAddressFromGeocache(record.get("RoboGeocache")),
          typeBusiness: record.get("TYPE"),
          phoneNumber: record.get("Phone"),
          websiteUrl: record.get("Website"),
          // update column name of "Short Description" when it's in the airtable
          shortDescription: record.get("Short Description"),
          // update column name of "Image URLs" when it's in the airtable
          imageUrls: record.get("Image URLs"),
          position: getLatLongFromGeocache(record.get("RoboGeocache")),
        };

        if (
          merchant.name &&
          merchant.address &&
          merchant.position.lat &&
          merchant.position.lng
        ) {
          list.push(merchant);
        }
      });
      fetchNextPage();
    });

  res.set("Access-Control-Allow-Origin", "*").send(list);
}
