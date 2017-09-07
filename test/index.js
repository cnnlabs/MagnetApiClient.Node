const chai = require('chai');
chai.should();
const MagnetAPIClient = require('../index');
let client;
const fakeArticle = {
    text: 'In an early morning tweetstorm, President Donald Trump this morning stated that nothing of particular bad news happend yesterday. As a first for his presidency, this was worthy of at least 6 tweets from the president so far. We hope to see much more of this non-happening in the near future.',
    title: 'Trump: Nothing bad happened yesterday',
    insertDate: '23 JAN 2017 10:12:00 +01:00',
    articleUID: '123-456-7890-111213',
    source: 'fakeNews',
    language: 'en',
    format: 'json'
};

const ENDPOINT_URI = 'http://magnetapi.klangoo.com/NewsAgencyService.svc';
const CALK = process.env.CALK;
const SECRET_KEY = process.env.SECRET;

describe('Klangoo Magnet API Client', () => {
    before(() => {
        client = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);
    });

    it('should allow adding articles', () => {
        return client.callWebMethod('AddArticle', fakeArticle, 'POST');
    });

    it('should allow retrieval of article metadata', () => {
        const req = {
            articleUID: fakeArticle.articleUID,
            format: 'json'
        };
        return client.callWebMethod('GetArticle', req, 'GET');
    });

    it('should allow updating articles', () => {
        const updatedArticle = {
            text: `${fakeArticle.text} \nUPDATE: It was discovered that in fact several bad things happened, including increased tensions with France, Germany, and Australia.`,
            updateDate: '24 JAN 2017 10:12:00 +01:00',
            articleUID: fakeArticle.articleUID,
            language: 'en',
            format: 'json'
        };
        return client.callWebMethod('UpdateArticle', updatedArticle, 'GET');
    });

    it('should allow deleting articles', () => {
        const req = {
            articleUID: fakeArticle.articleUID,
            format: 'json'
        };
        return client.callWebMethod('DeleteArticle', req, 'POST');
    });

    it('should allow paginated listing of all articles', () => {
        const req = {
            page: 0,
            orderByDate: true,
            format: 'json'
        };
        return client.callWebMethod('ShowIndex', req, 'GET');
    });
});
