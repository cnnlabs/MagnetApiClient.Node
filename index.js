const urlParser = require('url');
const fetch = require('request-promise');
const utils = require('./lib/utils');
const MagnetSigner = require('./lib/signer');

class MagnetAPIClient {
    constructor(endpointUri, calk, secretKey) {
        this._calk = null;
        this._magnetSigner = null;
        this._proxy = null;
        this._calk = calk;
        this._serverAddress = urlParser.parse(endpointUri).hostname;
        this._endpoint = urlParser.parse(endpointUri).path;

        if (secretKey) {
            this._magnetSigner = new MagnetSigner(endpointUri, secretKey);
        }
    }

    prepareRequest(methodName, request) {
        //add calk to request, if it does not exist.
        if (!this.requestHasCalk(request)) {
            //request is Query String
            if (typeof request == 'string') {
                if (request.trim() == '') {
                    request = `calk=${this._calk}`;
                } else {
                    request = `calk=${this._calk}&${request}`;
                }
            }  else if (typeof request == 'object') { //request is an object / key - value
                request.calk = this._calk;
            }
        }
    }

    getQueryString(methodName, request, requestMethod, signRequest) {
        let queryString;
        if (signRequest && this._magnetSigner != undefined && this._magnetSigner != null) {
            queryString = this._magnetSigner.getSignedQueryString(methodName, request, requestMethod);
        } else if (typeof request == 'object') {
            queryString = this.constructQueryString(request);
        } else if (typeof request == 'string') {
            queryString = request;
        }
        return queryString;
    }

    callWebMethod(methodName, request, requestMethod, signRequest = true) {
        this.prepareRequest(methodName, request);
        const queryString = this.getQueryString(methodName, request, requestMethod, signRequest);

        let upperRequestMethod = requestMethod.toUpperCase();
        const requestObj = {
            method: upperRequestMethod,
            uri: `https://${this._serverAddress}/${this._endpoint}/${(upperRequestMethod == 'GET' ? `${methodName}?${queryString}` : methodName)}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        if (upperRequestMethod === 'POST') {
            requestObj.body = queryString;
        }
        return fetch(requestObj);
    }

    requestHasCalk(request) {
        //request is Query String
        if (typeof request == 'string') {
            let queryStringLower = request.toLowerCase();
            if (queryStringLower.startsWith('calk=') || queryStringLower.contains('?calk=') || queryStringLower.contains('&calk=')) {
                return true;
            }
        } else if (typeof request == 'object') { //request is an object / key - value
            let calkFound = false;
            for (let prop in request) {
                if (request.hasOwnProperty(prop)) {
                    if (prop.toLowerCase() === 'calk') {
                        calkFound = true;
                    }
                }
            }
            return calkFound;
        }
        return false;
    }

    constructQueryString(request) {
        let queryString = '';
        if (request && Object.keys(request).length > 0) {
            for (let property in request) {
                if (request.hasOwnProperty(property)) {
                    queryString += utils.percentEncodeRfc3986(property);
                    queryString += '=';
                    queryString += utils.percentEncodeRfc3986(request[property]);
                    queryString += '&';
                }
            }
            queryString = queryString.substring(0, queryString.length - 1);
        }
        return queryString;
    }
}

module.exports = MagnetAPIClient;
