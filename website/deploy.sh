gcloud functions deploy  merchants --allow-unauthenticated --runtime=nodejs14 --trigger-http --entry-point=main.js --set-env-vars API_KEY=$API_KEY  