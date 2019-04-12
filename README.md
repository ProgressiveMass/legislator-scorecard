# Progressive Massachusetts Legislator Scorecard

Taking somewhat dry legislator information from various spreadsheets administered by [Progressive Massachussetts](https://www.progressivemass.com/) and turning them into a ...slightly less dry interactive scorecard app.

[**Check out the scorecard here!**](http://scorecard.progressivemass.com)

## Technical details

The gatsbyjs statically-generated site [uses google sheets as a CMS](https://docs.google.com/spreadsheets/d/17SfLTsqLaoBG8WE5vKHmBY_J6Iz1IFKThm_wAqsHZdg) and also sources additional legislator data from the [Open States API](https://docs.openstates.org/en/latest/api/v2/).

Hosted on Google Firebase with a Firebase serverless function for fetching geolocation data.
