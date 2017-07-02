
## Legislator Scorecard

### Purpose
[Progressive Massachusetts](http://www.progressivemass.com/) is a grassroots organization that tracks the legislation that makes its way through the Massachusetts State House.

In addition to tracking votes and bill cosponsorships, they analyze the content of the bills in order to offer ratings of legislators based on their advocacy for progressive legislation.

Until recently, all this data was contained in various spreadsheets on their website, which offered a somewhat daunting user experience for someone who wants to find out about their local legislators' records.

This small app was created to centralize the data and to present it in a more seamless, visually appealing, accessible and mobile-friendly manner.

### Tech Stack

The UI is in React, with the project scaffolded off create-react-app.
It talks to a small node backend.

### Tests

Right now there are functional tests using Testcafe and a few sad unit tests run by Jest.

To run the functional tests, `npm install -g testcafe` and then `npm run functional-test`. 
To run the unit tests, `npm run unit-test`.