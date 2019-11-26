# Money Tracker
Finance tracker with no need for your bank passwords.

Although I like tracking my expenses so I know how much I blew on beer this month, I don't like giving away my username and password to third-party services that would ask my banks for statements on my behalf. Instead, I wanted to create a simple app that would allow me to put in the information myself.

The basic features I'm shooting for in v1 are:
* Upload a .CSV from my credit card. Without this, it would be far too annoying to input each line item and I simply would not do it
* Add / edit / remove line items
* Show a list of line items that I can query by date
* Show at least one pretty graph

## Development

In the `src` directory, run `npm run dev`. The server and website will start up concurrently. The website is available at `http://localhost:8080`. Requests to the API are proxied to `http://localhost:3000` via the Webpack dev server in the web project.

## Basics

The package `money-tracker` contains the domain definition. The `web` project is a React app that communicates with the `server` project via HTTP. The system uses MySQL to make the system easy to run in a single docker image and make data backups easy.
