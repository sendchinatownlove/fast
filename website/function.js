var Airtable = require('airtable');
const { mainModule } = require('process');

const apiKey = process.env['API_KEY']
var base = new Airtable({ apiKey: apiKey }).base('appr3WjXIpUbPqFgm');

const AsyncAirtable = require('async-airtable');
const asyncAirtable = new AsyncAirtable(apiKey, BASE_ID)


//// Works 
// base('SCL Merchants').select({
//     // Selecting the first 3 records in Active Merchants:
//     view: "Active Merchants"
// }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     records.forEach(function(record) {
//         console.log('Retrieved', record.get('SCL Merchant Name'));
//     });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
// });

async function main() {
    list = []
    return new Promise((resolve, reject) => {

        const list = await base('SCL Merchants').select({
            // Selecting the first 3 records in Active Merchants:
            view: "Active Merchants"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
                console.log('Retrieved', record.get('SCL Merchant Name'));
                list.push(record.get('SCL Merchant Name'))
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();


        }, function done(err) {
            if (err) { console.error(err); return; }
            resolve(list)
        });
    }).catch(err=>console.log(err))

}
