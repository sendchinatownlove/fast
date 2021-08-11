## website 

Proxy for CMS to populate sendchinatownlove.com merchant information

# DEPLOY
- gcloud console
- editor permission to `sendchinatownlove` project 

# Test Local

``` bash
cp .sample.env .env
# Get Airtable KEY
source .env  
npm install 
npx @google-cloud/functions-framework --target=main
# curl localhost:8080
```