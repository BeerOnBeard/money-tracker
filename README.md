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

## Warning

The API does not have a restriction on the number of results returned. This is a design choice, but can cause some serious performance issues if this was used in a larger system.

## Notes

### Warning: The final argument passed to useEffect changed size between renders. The order and size of this array must remain constant.

This is a warning that React throws up when a user deletes a transaction. It is due to the way `useEffect` is being used. In order to only fire `useEffect` when a transaction changes, I chose to use the spread operator to force the `useEffect` function to watch each individual transaction instead of the transactions collection, aka "data" in the `TransactionPieChart`. Until I find a reasonable workaround, I'm going to take the hit of React throwing a warning into the console when in development mode.
