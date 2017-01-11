const apiKey = process.env.CHALLONGE_API_KEY
const baseURL = 'https://api.challonge.com/v1'
const subdomain = process.env.CHALLONGE_SUBDOMAIN || 'scv'

module.exports = { apiKey, baseURL, subdomain }
