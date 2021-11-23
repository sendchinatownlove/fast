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
                const merchant = {
                    "name": record.get('SCL Merchant Name'),
                    "address":  record.get('Description'),
                    "type_business": record.get('Type of Business'),
                    "phone_number": record.get('Merchant Phone Number')
                }
                // console.log('Retrieved', merchantName);
                list.push(merchant);
            });
            fetchNextPage();
        });

    return res.send(list);
}
