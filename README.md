# thorz.js
npm package for Thorz

# Usage
* `const tokenprocess = require('thorz').apiTokenProcess` gains access to the background API token process
* `tokenprocess.start(options)` starts the background process that periodically fetches the OAuth token to access an API server
* `tokenprocess.getToken()` gets the current OAuth token

# Usage example
The following example sets up Thorz.js as a background process that periodically fetches the OAuth token for API access
```javascript
const requestp = require('request-promise')
const tokenprocess = require('thorz').apiTokenProcess

tokenprocess.start({
  authorization_url: env.THORZ_AUTHORIZATION_URL,
  client_id: env.THORZ_CLIENT_ID,
  client_secret: env.THORZ_CLIENT_SECRET,
  fetch_interval: 600   // every 10 minutes
})

async function main() {
  // do some stuff
  // .
  // .

  // obtain data from API, using the token obtained from the tokenprocess
  let data = await requestp({
    method: 'POST',
    uri: env.REMOTE_API_URL,
    headers: {
      Authorization: "Bearer " + tokenprocess.getToken()
    },
    body: {},
    json: true
  })

  // process the data obtained from API
  // .
  // .
}
```
