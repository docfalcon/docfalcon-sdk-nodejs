'use strict';

var DocFalconClient = require('../index.js'),
    expect = require('chai').expect,
    nock = require('nock');

describe('DocFalconClient', function () {
    var sut;
    var document;

    beforeEach(function () {
        sut = null;
    });

    describe('generate()', function () {
        it('should throw on missing apikey', function () {
            expect(function () { sut = new DocFalconClient(); }).to.throw('Missing apikey')
        });
        it('should return a buffered pdf stream as response', function () {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf')
                .reply(200, new Buffer([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]));
            document = {
                document: {
                    pages: [{ }]
                }
            };
            sut = new DocFalconClient('apikey');
            sut.generate(document, function (error, data) {
                expect(error).to.be(undefined);
                expect(data).to.be.an.instanceof(Buffer);
                expect(data).to.have.lengthOf(8);
            });
        });
        it('should return an error for a malformed document', function () {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf')
                .reply(400, {
                    errors: {
                        document: [{ memberNames: ['Document'], errorMessage: '\'Document\' must not be empty.' }]
                    },
                    formattedErrors: [{ key: 'Document', errors: ['\'Document\' must not be empty.'] }],
                    isValid: false
                });
            document = {
            };
            sut = new DocFalconClient('apikey');
            sut.generate(document, function (error, data) {
                expect(error).to.be(Error);
                expect(error.message).to.be('\'Document\' must not be empty.');
            });
        });
    });
});
