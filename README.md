Create-react app was used in order to implement this test

Current implementation does not support viewing data from the beginning of Covid Pandemic.
It only supports last 7 days and last 30 days starting from the current date minus one day.
Reason being, the public API being used: https://covid-api.com/api/ does not support getting data from a range of time.
It only supports one day data fetching.

To accomplish multiple days data fetching, multiple API calls are being made to the endpoing, each one with a specific day (not the best way of doing things).
After that - data is being aggregated, and based on the data, D3 chart is being created.

#

### Start the app
First run `npm install`, `npm start`.
After that, `npm run`.

Application is running on port 3000 (be sure it's available)

#
### Fetch regions
Fetch the list of regions at first
When a region is being selected, display provinces
From there - current functionality

#
### Provide a descriptive tooltip
When hovering on a bar - provide a desriptive tooltip with Number of infected and number of deaths for that period.
