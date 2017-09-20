var request = require('request'),
    qs = require('qs');

function DocFalconClient (apikey) {
    var API_URL = 'https://www.docfalcon.com/api/v1/pdf';
    if (!(typeof apikey === 'string')) {
        throw new Error('Missing apikey.');
    }
    this.generate = function (document, callback) {
        var options = {
            method: 'POST',
            uri: API_URL + '?' + qs.stringify({ apikey: apikey }),
            json: document,
            encoding: null
        };
        request(options, function (error, response) {
            callback(error, response.body);
        });
    };
}

module.exports = DocFalconClient;
