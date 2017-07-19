**This library allows you to easily use the Magnet API via NodeJS.**

# Table of Contents

* [About](#about)
* [Installation](#installation)
* [Usage](#usage)


<a name="about"></a>
# About

Magnet offers online publishers and digital content providers with the following features to help them better engage their users on their website and mobile App.
- Topically Related Articles
- Personalized Recommendations
- Automatically Generated Summary
- Follow a Specific Topic
- Follow a Developing Story
- Meta Tags/Description
- Highlight Named-Entities
- Entity Listing
- Entity Pages
[Read More](http://www.klangoo.com/Engagement.aspx).

[Book a demo with our sales team now!](mailto:sales@klangoo.com)

<a name="installation"></a>
# Installation

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/)
- An API Key Provided by [Klangoo](http://klangoo.com)
- An API Secret Provided by [Klangoo](http://klangoo.com)


## Install

To use MagnetApiClient in your NodeJS project, you can either <a href="https://github.com/Klangoo/MagnetApiClient.Node">download the Magnet API Library directly from our Github repository</a> or, if you have the Node package manager installed, you can grab them automatically by running

```
$ npm install @klangoo/magnetapiclient
```

Once you have the Magnet API Client properly referenced in your project, you can include calls to them in your code.
For sample implementations, check the [news agency sample](https://github.com/Klangoo/MagnetApiClient.Node/blob/master/newsagencysample.js).

## Dependencies

Magnet API Client uses the following Node built in Libraries:
- [HTTP](https://nodejs.org/api/http.html)
- [Crypto](https://nodejs.org/api/crypto.html)
- [URL](https://nodejs.org/api/url.html)


<a name="usage"></a>
# Usage

## Get Article

The following is an example for reading an article from the API:

```javascript
function getArticle(articleUID) {
	let request = {}; //request json object (key / value) will handle all the request parameters.
	request.articleUID = articleUID;
	request.format = "json";
  
	//instance of the magnetapiclient 
	var MagnetAPIClient = require('magnetapiclient');
	var _magnetAPIClient = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);

	try {
		_magnetAPIClient.CallWebMethod("GetArticle", request, "GET", function (data) {

			let parsedResult = JSON.parse(data);

			console.log("GetArticle: ");

			if (parsedResult.status == "OK") {
				console.log("Success", parsedResult);
			}
			else {
				HandleApiError(parsedResult);
			}
		});
	}
	catch (error) {
		console.log("Exception occured: ", error);
	}
}
```

The same applies for posting or updating an article. following is an example for adding an article:

```javascript
function getArticle(articleUID) {
	let request = {}; //request json object (key / value) will handle all the request parameters.
	request.text = "SAMPLE ARTICLE TEXT";
	request.title = "SAMPLE ARTICLE TITLE";
	request.insertDate = "23 JAN 2017 10:12:00 +01:00"; //article date
	request.url = "http://demo.klangoo.com/article-demo/api-example";
	request.articleUID = articleUID;
	request.source = "klangoo.com";
	request.language = "en";
	request.format = "json";
  
	//instance of the magnetapiclient 
	var MagnetAPIClient = require('magnetapiclient');
	var _magnetAPIClient = new MagnetAPIClient(ENDPOINT_URI, CALK, SECRET_KEY);

	try {
		_magnetAPIClient.CallWebMethod("addArticle", request, "POST", function (data) {

			let parsedResult = JSON.parse(data);

			console.log("GetArticle: ");

			if (parsedResult.status == "OK") {
				console.log("Success", parsedResult);
			}
			else {
				HandleApiError(parsedResult);
			}
		});
	}
	catch (error) {
		console.log("Exception occured: ", error);
	}
}
```

You can find an example of all of the API calls here [here](https://github.com/Klangoo/MagnetApiClient.Node/blob/master/newsagencysample.js).
