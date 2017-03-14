A small entirely client-side app built with React that offers a searchable interface to the [Progressive Massachusetts Senate Scorecard.](http://www.progressivemass.com/189thscorecard-senate)

## The following data sources are used:

### 1. Google Geocoding API
To get a latitude/longitude for the user.

### 2. [Shapefile Data for MA Senate Districts](http://www.mass.gov/anf/research-and-tech/it-serv-and-support/application-serv/office-of-geographic-information-massgis/datalayers/senate2012.html) converted to Geojson.
You can place the user's latitude/longitude within one of the districts.

#### Why not just use the Google Civic API to find the user's reps?

Because it [only returns local politician info for certain addresses](https://github.com/5calls/5calls/issues/167), primarily residential ones, and I found that kind of frustrating.

### 3. The 2015-16 Progressive Mass Scorecard
Is parsed into JSON and then augmented with information from

### 4. [The Open States API legislator search](http://docs.openstates.org/en/latest/api/legislators.html#legislators)

In theory, I could have used the Open State API's location-based legislator search instead of the Google geolocation/MA Senate Districts geojson combination, but I would have had to add a backend to the app since as far as I know you can't do client-side requests to the Open States API. In addition, I wasn't sure about the longevity of the Open States API since I know it has recently switched to being a volunteer-run effort.

The data from the Mass Scorecard and the Open States API is matched based on legislator name. Currently the way this match process is handled is imperfect, because some names are different enough from the two sources to break the matches (e.g. "Vinny DeMacedo" doesn't match with "Viriato Manuel de Macedo" and has to be hand-curated).

The information added from the Open States API is 1) whether the senator is also the 2017-2018 senator, and if not, who is. Open States API also provides profile picture links and links to the official profile page for the senator.

### 5. [The 2015-2016 Progressive Mass Bill Info](https://docs.google.com/spreadsheets/d/1H3RfTvgVCyh3sigKzaO0GFWnuFyCZFb4zwiISrB95M8/pubhtml?gid=197580524&single=true)
Is parsed into JSON, cleaned up a little so that the bill numbers can be matched to the bill numbers in the scorecard
