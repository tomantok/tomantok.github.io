---
title: "Rules of building a REST API"
date: 2019-06-08
description: "13 rules that I always follow when designing REST APIs. Such APIs are a clean, readable way of communicating between services with clearly defined rules."
---

Your REST API should be a clean, readable way of communication between services with clearly defined rules. What rules are worth following when building an REST API? Here are the most important in my opinion.

## 1. Use nouns in paths

Paths in the REST API should be **nouns** - point to specific resources you want to access. For example:

```
/books
/books/once-upon-a-time-in-a-hollywod
/books/831231201
/cars/audi/a4/b6/2009/diesel/2.0
/invoices/google-analytics/2019/03/12/151
```

Verbs should not be used in the REST API. Below are examples of invalid paths:

```
/getBooks
/books/once-upon-a-time-in-a-hollywod/update/status
/invoices/google-analytics/2019/03/12/151/markAsPaid
```

Thanks to the use of a hierarchical structure of objects and simple (noun) resource addressing, the API is much more intuitive, scalable and easier to use.

## 2. Use methods according to their purpose

REST is based on patterns developed in the HTTP protocol. Therefore, it uses the methods known from HTTP.

If your application provides only GET and POST methods, it means that you are not implementing REST model correctly.

So what should it actually look like? Here are some examples:

- ```GET /books``` - downloads a list of books
- ```POST /invoices/google-analytics``` - adds an invoice
- ```PUT /books/once-upon-a-time-in-a-hollywod``` - overwrites a specific book
- ```PATCH /books/831231201``` - updates a specific book
- ```DELETE /invoices/google-analytics/2019/03/12/151``` - deletes the invoice from the given path
- ```HEAD /cars/audi/a4/b6/2009/diesel/2.0``` - returns information whether a given resource exists (without sending the content of the resource)
- ```OPTIONS /books``` - returns a list of methods that are available for a given resource

Using the appropriate addressing of resources, we are able to perform all operations on application objects without the need to create additional paths like ```/offer/321312/markAsExpired```, in which we incorrectly use verbs.

## 3. Use HTTP status codes

The HTTP protocol on which REST is based is not only addresses and methods - but also status codes. There are over 50 of them. Their greatest advantage is that they are standardized and mean the same everywhere. Thanks to this, when communicating with any REST service, you immediately know what the information means.

It is important to use these codes when designing your own REST API and return the ones that best match the event.

See [here](https://www.webfx.com/web-development/glossary/http-status-codes/) for descriptions of all HTTP status codes. Look there the next time you're wondering which code to use - 200, 201 or maybe 204.

## 4. Return data in an envelope

What distinguishes REST services from SOAP services is the lack of a canonical model - in other words - an imposed and required data structure. On the one hand, this is an advantage - because it gives a lot of flexibility, and on the other - a problem, because we cannot easily define the format according to which data should be sent.

Regardless of what data structure you adopt, remember to always send them in an envelope as below.

```date``` field in case of correct answer:

```
{
	"data": []
}
```

And an ```error``` field in case of errors:

```
{
	"error": {
		"code": "",
		"message": "",
		"details": ""
	}
}
```

## 5. Return valuable error responses

When something in communication with your API went wrong, try to return detailed information. The ```'Oops, something went wrong'``` message is not the best idea. It is better to include information such as:

- ```code``` - internal error code of your application that will allow you to identify the problem
- ```msg``` - error text message
- ```details``` - optional information with details of a given problem

What might such a message look like? For example:

```
{
	"error": {
		"code": "40",
		"message": "Insufficient account balance",
		"details": "Unable to transfer 100€. Not enough funds on the account"
	}
}
```

## 6. Use pagination

You have an endpoint for returning a list of objects, for example users registered in the database. What if you have, say, 2 million objects in your database?

Where there are a lot of objects, you need to paginate and return only a subset of all objects.

The standard pagination method is based on a pair: ```FROM``` and ```SIZE```. So you browse the resources from the backend by executing the following queries:

1. ```from=0, size=10```
2. ```from=10, size=10```
3. ```from=20, size=10```
4. ```from=30, size=10```
5. ```from=40, size=10```
6. ... and so on

What if a new object was added to the system between query 3 and 4? What if some object was removed from it? There will be an inconsistency in your results.

Instead, always sort objects by fixed attributes - for example ```ID```, and use parameters during pagination:

- ```size=10```
- ```greaterThanOrEqual=<LAST_ITEM_ID> size=10```
- ```greaterThanOrEqual=<LAST_ITEM_ID_PAGE_2> size=10```
- ```greaterThanOrEqual=<LAST_ITEM_ID_PAGE_3> size=10```

By inserting the last ID of the last object returned from the backend into the ```greaterThanOrEqual``` field.

## 7. Version your API

When you introduce breaking changes to your API, never do it on already published endpoints. Support old APIs and introduce new ones next to existing ones.

```
GET v1/users
GET v2/users
```

Over time, you can also monitor the use of the old API and remove it when it is no longer used.

## 8. Separate complicated filtering as a separate search endpoint

If you need to filter the results returned by the API, you can add a regular query parameter, for example:

```
GET /users?created=2017
```

But what if you want to search for more parameters like: place of residence, email, number of comments, and so on?

Use a special endpoint - ```_search``` to search your resources. Think of it as a special extra resource. An example query might then look like this:

```
POST /books/_search
```
```
{
	"genre": "lyric",
	"country": "Netherlands",
	"era": "renaissance",
	"rating": 4.5
}
```

## 9. Update objects with the PATCH method

There are two methods to update a resource - ```PUT``` and ```PATCH```. How do they differ? ```PUT``` - should overwrite the entire object, and ```PATCH``` overwrite only the sent attributes.

The following request should only overwrite the user's email:

```
PATCH /users/134
```
```
{
	"email": "user@domain.com"
}
```

On the other hand, ```PUT``` will overwrite the entire object.

### 10. ```GET``` should not send payload

Why did I use the ```POST``` method in step 8 when defining the _search endpoint? Although it would seem that it should be ```GET```.

There is one problem with the ```GET``` method. By definition, it should not contain any *payload* i.e. parameters in the query header. And although some applications accept them, it is not a rule that all of them must do so.

It may happen that one component of the entire chain of calls skips sending the body of the ```GET``` request and the server will not receive your request. Thus, it will return you only the basic data placed under the requested resource.

## 11. ```POST``` always creates a new object

Always use the ```POST``` method to create new objects. Examples:

- ```POST /books``` - will create a book in the system,
- ```POST /books/123/comment``` - will add a comment to the book
- ... and so on

Even if you happen to send the ```id``` field in the body of the request - in the case of ```POST```, it can be freely omitted by the server, which will create a new resource anyway.

## 12. ```PUT```, ```DELETE``` and ```PATCH``` should be idempotent #

When sending modification requests with REST, always send the state, not the request. Each call to the REST API should be idempotent - that is, change a given resource at most once - even if done multiple times.

Therefore, such a request is valid:

```
PATCH /users/ships/turn
```
```
{
	"field": "A3"
}
```

And this is not correct:

```
PUT /stats/counter
```
```
{
	"incrementBy": 1
}
```

When, due to network problems, request number two is repeated, we will receive an incorrect data state in our system.

## 13. Use headers to send metadata

If you need to send some meta-data to the API provider, do not extend the object you send. Instead, use HTTP headers and put information there for authentication, enabling special flags or sending diagnostic data. Leave the content of the requests blank.

Also remember point 10 - ```GET``` should not have a payload. In this case you MUST send the metadata in the headers.

