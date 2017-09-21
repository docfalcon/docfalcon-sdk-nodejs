'use strict';

var request = require('request'),
    qs = require('qs');

var API_URL = 'https://www.docfalcon.com/api/v1/pdf';

function DocFalconClient (apikey) {
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
        request(options, function (error, response, body) {
            if (error) {
                callback(error);
            }
            else if (response.statusCode !== 200) {
                var message = body.formattedErrors[0].errors[0];
                callback(new Error(message));
            }
            else {
                callback(error, body);
            }
        });
    };
}

module.exports = DocFalconClient;
