'use strict';

var Promise = require('bluebird'),
    request = require('request'),
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
            encoding: null,
            headers: {
                'Accept': 'application/json, application/pdf'
            }
        };
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                else if (response.statusCode !== 200) {
                    var err;
                    if (typeof body === 'object' && body !== null && body.errors) {
                        err = new Error(body.errors[0]);
                    }
                    else {
                        err = new Error('HTTP error: ' + response.statusCode + '.');
                        reject(err);
                    }
                    return reject(err);
                }
                else {
                    return resolve(body);

                }
            });
        })
            .nodeify(callback);
    };
}

module.exports = DocFalconClient;
