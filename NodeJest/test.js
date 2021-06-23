const jestOpenAPI = require('jest-openapi');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

let token;
let credentials = JSON.parse(fs.readFileSync('credentials.json'));

// Load an OpenAPI file (YAML or JSON)
jestOpenAPI(__dirname + path.sep + 'openapi.yml');

// get a valid OAuth token
beforeAll(async() => {
  token = (await axios.post('https://viktorschuhmann-ab4ec606-eval-test.apigee.net/oauth2',
  'grant_type=client_credentials',
  { auth: {
  username: credentials.apikey,
  password: credentials.secret
}})).data.access_token;
});

describe('GET /apigeetask', () => {
  it('should satisfy OpenAPI spec', async () => {

    // Get an HTTP response from apigee
    const res = await axios.get('https://viktorschuhmann-ab4ec606-eval-test.apigee.net/apigeetask?apikey=' + credentials.apikey,
  { headers: {'Authorization': 'Bearer ' + token}});

    expect(res.status).toEqual(200);
    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });
});
