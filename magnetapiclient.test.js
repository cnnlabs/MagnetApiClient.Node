const expect = require('expect'); const nock = require('nock'); 
var MagnetAPIClient = require('./magnetapiclient');

const ENDPOINT_URI = "http://magnetapi.klangoo.com/NewsAgencyService.svc";
const CALK = "ENTER_YOUR_CALK";
const SECRET_KEY = "ENTER_YOUR_SECRET_KEY";
const articleUID = "2017/03/28/example-api-usage";



describe('MagnetAPIClient', function() {

    it('should be able to add an article', function (done) {

        const request = {
            text: 'SAMPLE ARTICLE TEXT',
            title: 'SAMPLE ARTICLE TITLE',
            insertDate: '23 JAN 2017 10:12:00 +01:00',
            url: 'http://demo.klangoo.com/article-demo/api-example',
            articleUID,
            source: 'klangoo.com',
            language: 'en',
            format: 'json'
        };
        const client = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);

        nock(ENDPOINT_URI, {
            reqheaders: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).post('/AddArticle', function (body) {

            return body.calk === CALK && body.articleUID === articleUID;
        }).reply(200, { status: 'OK' });


        client.CallWebMethod('AddArticle', request, 'POST', function (data) {

            const parsedResult = JSON.parse(data);

            expect(parsedResult.status).toEqual('OK');
            done();
        });
    });

    it('should be able to update an article', function (done) {

        const request = {
            text: 'SAMPLE ARTICLE TEXT UPDATED',
            updateDate: '24 JAN 2017 10:12:00 +01:00',
            articleUID,
            language: 'en',
            format: 'json'
        };
        const client = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);

        nock(ENDPOINT_URI, {
            reqheaders: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).post('/UpdateArticle', function (body) {

            return body.calk === CALK && body.articleUID === articleUID;
        }).reply(200, { status: 'OK' });

        client.CallWebMethod('UpdateArticle', request, 'POST', function (data) {

            const parsedResult = JSON.parse(data);

            expect(parsedResult.status).toEqual('OK');
            done();
        });
    });

    it('should be able to delete an article', function (done) {

        const request = {
            articleUID,
            format: 'json'
        };
        const client = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);

        nock(ENDPOINT_URI, {
            reqheaders: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).post('/DeleteArticle', function (body) {

            return body.calk === CALK &&
                   body.articleUID === articleUID &&
                   body.format === request.format &&
                   typeof body.timestamp !== 'undefined' &&
                   typeof body.signature !== 'undefined';
        }).reply(200, { status: 'OK' });


        client.CallWebMethod('DeleteArticle', request, 'POST', function (data) {

            const parsedResult = JSON.parse(data);

            expect(parsedResult.status).toEqual('OK');
            done();
        });
    });

    it('should be able to get an article', function (done) {

        const request = {
            articleUID,
            format: 'json'
        };
        const client = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);

        nock(ENDPOINT_URI, {
            reqheaders: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).get('/GetArticle').query(function (q) {

            return q.calk === CALK &&
                   q.articleUID === articleUID &&
                   q.format === request.format &&
                   typeof q.timestamp !== 'undefined' &&
                   typeof q.signature !== 'undefined';
        }).reply(200, { status: 'OK' });


        client.CallWebMethod('GetArticle', request, 'GET', function (data) {

            const parsedResult = JSON.parse(data);

            expect(parsedResult.status).toEqual('OK');
            done();
        });
    });

    it('should be able to show an index', function (done) {

        const request = {
            page: '0',
            orderByDate: 'true',
            format: 'json'
        };
        const client = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);


        nock(ENDPOINT_URI, {
            reqheaders: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).get('/ShowIndex').query(function (q) {

            return q.calk === CALK &&
                   q.format === request.format &&
                   q.orderByDate === request.orderByDate &&
                   q.page === request.page &&
                   typeof q.timestamp !== 'undefined' &&
                   typeof q.signature !== 'undefined';
        }).reply(200, { status: 'OK' });


        client.CallWebMethod('ShowIndex', request, 'GET', function (data) {

            const parsedResult = JSON.parse(data);

            expect(parsedResult.status).toEqual('OK');
            done();
        });
    });
});
