# Go Save Money
Go-based finance tracker with no need for your bank passwords.

Although I like tracking my expenses so I know how much I blew on beer this month, I don't like giving away my username and password to third-party services that would ask my banks for statements on my behalf. Instead, I wanted to create a simple app that would allow me to put in the information myself.

The basic features I'm shooting for in v1 are:
* Log in via Google. I have a Google account and they are happy to act as a federated authentication provider for me.
* Upload a .CSV from my credit card. Without this, it would be far too annoying to input each line item and I simply would not do it
* Add / edit / remove line items
* Show a list of line items that I can query by date
* Show at least one pretty graph

Also, technologies I would like to incorporate in v1 are:
* travis-ci for go build and test
* travis-ci for JS / SCSS linting, compiling, minifying and testing

# Why Go?
I've never used Go and it seems interesting. My day job involves a lot of Microsoft technologies and I thought it would be fun to learn something different.

# API Endpoints
GET /user/{userId}/transactions?startDate=x&endDate=y

POST /user/{userId}/transactions
  { t: [ { date: x, amount: y, title: z }, ... ] }
  
DELETE /user/{userId}/transactions/{tranGuid}

PUT /user/{userId}/transactions/{tranGuid}
  { date: x, amount: y, title: z }
