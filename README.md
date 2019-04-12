# Progressive Massachusetts Legislator Scorecard

[Check out the app here](http://scorecard.progressivemass.com)

Taking somewhat dry legislator information from various spreadsheets administered by [Progressive Massachussetts](https://www.progressivemass.com/) and turning it into a ...slightly less dry interactive scorecard app.

This scorecard app is a gatsbyjs statically-generated site that [uses google sheets as a CMS](https://docs.google.com/spreadsheets/d/17SfLTsqLaoBG8WE5vKHmBY_J6Iz1IFKThm_wAqsHZdg) and also sources additional legislator data from the [Open States API](https://docs.openstates.org/en/latest/api/v2/).

Hosted on Google Firebase with a Firebase serverless function for fetching geolocation data.
