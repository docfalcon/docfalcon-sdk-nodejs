# DocFalcon SDK for Nodejs

[![Build Status](https://travis-ci.org/docfalcon/docfalcon-sdk-nodejs.svg?branch=master)](https://travis-ci.org/docfalcon/docfalcon-sdk-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/docfalcon/docfalcon-sdk-nodejs/badge.svg?branch=master)](https://coveralls.io/github/docfalcon/docfalcon-sdk-nodejs?branch=master)
[![npm version](https://badge.fury.io/js/docfalcon-sdk.svg)](https://badge.fury.io/js/docfalcon-sdk)

## Introduction

This library provides Nodejs integration for [DocFalcon](https://www.docfalcon.com/) APIs.

We welcome [feedback and issues](https://github.com/docfalcon/docfalcon-sdk-nodejs/issues) you may spot while using it. 

## Installation

```
npm i --save docfalcon-sdk
```

## Usage

DocFalcon has one very simple and intuitive API for PDF generation. 
This library is a very simple wrapper around an http client and supports both callbacks and promises.

### PDF Generation

This is an example on use it with a callback

```javascript
'use strict';

var DocFalconClient = require('docfalcon-sdk'),
    fs = require('fs');

var businessCard = require('./samples/business_card.json');

var docfalcon = new DocFalconClient('YOUR_APIKEY');
docfalcon.generate(businessCard, function (error, response) {
    if (error) {
        console.log(error);
    }
    else {
        fs.writeFileSync('business_card.pdf', response);
        console.log('business_card.pdf written! (' + response.length + ' bytes).');
    }
});
```

The same can be achieved with promises
```javascript
'use strict';

var DocFalconClient = require('docfalcon-sdk'),
    fs = require('fs');

var businessCard = require('./samples/business_card.json');

var docfalcon = new DocFalconClient('YOUR_APIKEY');
docfalcon.generate(businessCard)
    .then(function (response) {
        fs.writeFileSync('business_card.pdf', response);
        console.log('business_card.pdf written! (' + response.length + ' bytes).');
    })
    .catch(function (error) {
        console.error(error);
    });

```

You can get more info about how to get an apikey or how to describe your document by looking at the [docs](https://www.docfalcon.com/docs).

## License 
BSD 3-Clause License

Copyright (c) 2017, DocFalcon