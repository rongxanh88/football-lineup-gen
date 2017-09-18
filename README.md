# Daily Lineup Generator

Fantasy Football Lineup Generator for Draft Kings Lineup. The generator currently makes all calls to my API, which you can find the repo [here](https://github.com/rongxanh88/fantasy_football).
The algorhythym for generating the lineup is a current work in progress and currently sorts all the positions by point production, and truncates the data set to five players per position. The
app then calculates all lineup permutations and returns a lineup. The API currently restricts players who are injured, suspended, or on bye week. The API also restricts players who have already
played in the current week.

The generator also allows the user to upload the latest salary data via CSV from Draft Kings. Please upload the new salary data every week before using the generator. Lastly, you can apply a primitive
multiplier to player stats depending on temperature and wind conditions. This is still a work in progress.

## Getting Started

Please see install instructions. Also, go to Draftkings and download a CSV of their current lineup data for the week.

### Installing

Install all dependencies
```
npm install
```

Run the dev environment with
```
npm start
```

## Deployment

[Currently Deployed on Heroku](https://football-lineup-gen-1703.herokuapp.com/)

## Built With

* [React](https://github.com/facebookincubator/create-react-app) - The web framework used
* [Axios](https://github.com/mzabriskie/axios) - Helps with making AJAX requests

## Authors

* **Bao Nguyen** - *Initial work* - [Github](https://github.com/rongxanh88)