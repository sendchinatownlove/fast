import Airtable from "airtable";

const apiKey = process.env["API_KEY"];
Airtable.configure({ apiKey: apiKey });
const base = Airtable.base("appr3WjXIpUbPqFgm");

export async function main(req, res) {
    let list = [];
    await base("SCL Merchants")
        .select({
            view: "Active Merchants",
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                const merchantName = record.get('SCL Merchant Name');
                // console.log('Retrieved', merchantName);
                list.push(merchantName);
            });
            fetchNextPage();
        });

    return res.send(list);
}
