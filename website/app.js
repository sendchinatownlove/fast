var Airtable = require('airtable');

const apiKey = process.env['API_KEY']
var base = new Airtable({apiKey: apiKey}).base('appr3WjXIpUbPqFgm');

base('All Chinatown Merchants').select({
    // Selecting the first 3 records in All Chinatown Merchants:
    maxRecords: 3,
    view: "All Chinatown Merchants"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});