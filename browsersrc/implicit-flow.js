// this handles the browser-based implicit OAuth flow
// const $ = window.$
const localStorage = window.localStorage


function parseHash(hash) {
  let result = { }
  if (hash == null || hash === '') return result
  let params = hash.substring(1).split('&')
  for (let i = 0; i < params.length; i++) {
    let p = params[i].split('=')
    result[decodeURIComponent(p[0])] = decodeURIComponent(p[1])
  }
  return result
}


// checks to see if any access token is in the URL hash
function checkAccessToken() {
  let hash = window.location.hash
  if (hash != null && hash !== '') {
    // console.log('has hash')
    let params = parseHash(hash)
    if (params.state !== localStorage.getItem('thorz-request-state')) throw new Error("Thorz: state value does not match expected value")
    //
    localStorage.removeItem('thorz-request-state')
    // console.log(token)
    return params.access_token
  } else {
    return undefined
  }
}


// example:
// $("#request-button").click(function() {
//    requestAccess({
//      auth_url: 'https://auth.thorz.com/auth/.../application/connect/authorize',
//      client_id: client_id,
//      redirect_url: current_url
//    })
// })
function requestAccessToken(opts) {
  let state = '' + Math.random()
  let nonce = '' + Math.random()
  localStorage.setItem('thorz-request-state', state)
  let redirectUrl = opts.redirect_url ? opts.redirect_url : window.location.href.substring(0, window.location.href.length - window.location.hash.length)
  let authUrl = opts.auth_url + '?' +
    'client_id=' + opts.client_id + '&' +
    'redirect_uri=' + encodeURIComponent(redirectUrl) + '&' +
    'response_type=token&scope=rolesPermissions&state=' + encodeURIComponent(state) + '&nonce=' + encodeURIComponent(nonce)
  window.location.href = authUrl
}


exports.checkAccessToken = checkAccessToken
exports.requestAccessToken = requestAccessToken
