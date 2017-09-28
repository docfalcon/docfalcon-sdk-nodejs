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

    describe('constructor()', function () {
        it('should throw on missing apikey', function (done) {
            expect(function () { sut = new DocFalconClient(); }).to.throw('Missing apikey');
            done();
        });
    });

    describe('generate()', function () {
        it('should return a buffered pdf stream as response (callback style)', function (done) {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf?apikey=apikey')
                .reply(200, new Buffer([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]));
            document = {
                document: {
                    pages: [{ }]
                }
            };
            sut = new DocFalconClient('apikey');
            sut.generate(document, function (error, data) {
                expect(error).to.be.null;
                expect(data).to.be.an.instanceof(Buffer);
                expect(data).to.have.lengthOf(8);
                done();
            });
        });
        it('should return a buffered pdf stream as response (promise style)', function () {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf?apikey=apikey')
                .reply(200, new Buffer([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]));
            document = {
                document: {
                    pages: [{ }]
                }
            };
            sut = new DocFalconClient('apikey');
            return sut.generate(document)
                .then(function (data) {
                    expect(data).to.be.an.instanceof(Buffer);
                    expect(data).to.have.lengthOf(8);
                });
        });
        it('should return an error for a malformed document (callback style)', function (done) {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf?apikey=apikey')
                .reply(400, { message: '\'Document\' must not be empty.' });
            document = {
            };
            sut = new DocFalconClient('apikey');
            sut.generate(document, function (error) {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.equal('\'Document\' must not be empty.');
                done();
            });
        });
        it('should return an error for a malformed document (promise style)', function () {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf?apikey=apikey')
                .reply(400, { message: '\'Document\' must not be empty.' });
            document = {
            };
            sut = new DocFalconClient('apikey');
            return sut.generate(document)
                .catch(function (error) {
                    expect(error).to.be.an.instanceof(Error);
                    expect(error.message).to.equal('\'Document\' must not be empty.');
                });
        });
        it('should return an error on unknown error (callback style)', function (done) {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf?apikey=apikey')
                .reply(522);
            document = {
            };
            sut = new DocFalconClient('apikey');
            sut.generate(document, function (error) {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.equal('HTTP error: 522.');
                done();
            });
        });
        it('should return an error on unknown error (promise style)', function () {
            nock('https://www.docfalcon.com')
                .post('/api/v1/pdf?apikey=apikey')
                .reply(522);
            document = {
            };
            sut = new DocFalconClient('apikey');
            return sut.generate(document)
                .catch (function (error) {
                    expect(error).to.be.an.instanceof(Error);
                    expect(error.message).to.equal('HTTP error: 522.');
                });
        });
    });
});
