import Airtable from "airtable";
import {
  getLatLongFromGeocache,
  getAddressFromGeocache,
} from "./utility/geocache.js";
// NEW appiSJ1OjwedFmqAS/tbl34Ty4rZjbFbdDl/viwrX3NAuGkgoAAHH
const apiKey = process.env["API_KEY"];
Airtable.configure({ apiKey: apiKey });
// const base = Airtable.base("appr3WjXIpUbPqFgm"); OLD SCL ONE 
const base = Airtable.base("appr3WjXIpUbPqFgm"); 

export async function main(req, res) {
  let list = [];

  res.set('Access-Control-Allow-Origin', '*');

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Add any methods you need
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any headers you need
    res.set('Access-Control-Max-Age', '3600'); // Optional: Cache preflight response for 1 hour
    res.status(204).send('');
    return;
  }
  await base("SCL Merchants")
    .select({
      view: "MapView",
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const merchant = {
          name: record.get("SCL Merchant Name"),
          address: getAddressFromGeocache(record.get("RoboGeocache")),
          typeBusiness: record.get("Type of Business"),
          phoneNumber: record.get("Merchant Phone Number"),
          websiteUrl: record.get("Website"),
          shortDescription: record.get("Short Description"),
          imageUrls: record.get("Image URLs"),
          heroURL: record.get("Hero Image URL"),
          story: record.get("Story"),
          position: getLatLongFromGeocache(record.get("RoboGeocache")),
          hide_on_map: record.get("WEBSITE_SHOW_ON_MAP")
        };

        if (
          merchant.name &&
          merchant.address &&
          merchant.position.lat &&
          merchant.position.lng &&
          merchant.hide_on_map != true) {
          list.push(merchant);
        }
      });
      fetchNextPage();
    });

  res.set("Access-Control-Allow-Origin", "*").send(list);
}
