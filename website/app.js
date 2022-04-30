import Airtable from "airtable";
import {
  getLatLongFromGeocache,
  getAddressFromGeocache,
} from "./utility/geocache.js";

const apiKey = process.env["API_KEY"];
Airtable.configure({ apiKey: apiKey });
const base = Airtable.base("appr3WjXIpUbPqFgm");

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
          shortDescription: record.get("Short Description"),
          imageUrls: record.get("Image URLs"),
          heroURL: record.get("Hero Image URL"),
          story: record.get("Story"),
          position: getLatLongFromGeocache(record.get("RoboGeocache")),
          hide_on_map: record.get("Hide on Map")
        };

        if (
          merchant.name &&
          merchant.address &&
          merchant.position.lat &&
          merchant.position.lng
        ) && (merchant.hide_on_map != true) {
          list.push(merchant);
        }
      });
      fetchNextPage();
    });

  res.set("Access-Control-Allow-Origin", "*").send(list);
}
