## Prerequisites
First install http-server and ngrok globally
```bash
npm i -g http-server ngrok
```

## Usage
Run a local web server
```bash
http-server -p 8080
```

Create a publicly facing URI to connect to you local web server
```bash
ngrok http 8080
```

Browse to 
```bash
https://<your sub domain>.ngrok.io/atlassian-connect.json
```
to make sure the app is running.

Open up the app in your editor and open your `atlassian-connect.json` file. Find the `baseUrl` property and change it to
```bash
https://<your sub domain>.ngrok.io
```

Navigate to the "Manage add-ons" section in Confluence.

Click the "Upload add-on" link and paste in the url to you `atlassian-connect.json` file
```bash
https://<your sub domain>.ngrok.io/atlassian-connect.json
```

Then hit "upload".
