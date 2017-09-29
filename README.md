# PayPal Express Checkout Server Side REST Integration Demo WebApp

## Demo on heroku
[https://express-checkout-app.herokuapp.com/#/pattern/server](https://express-checkout-app.herokuapp.com/#/pattern/server)

## Description

Technical submission to address a developer relations scenario: 

*I'm a merchant with a bit of development experience! I went through your guide for the Express Checkout Server REST product, but I'm completely confused. How can I get up and running with it?*

This app is a modification of the awesome [interactive demo on the PayPal Developer site](https://developer.paypal.com/demo/checkout/#/pattern/client) which was conveniently provided in a [github repo](https://github.com/paypal/paypal-checkout-demo).

I felt combining this demo tool, which had a strong client side focus, with a similar API / SDK codegen tool would help a merchant get up and running ASAP.

With all of the code samples focused on the Express Checkout Server REST product, my thought was it would cut down on the clutter.

## Research

### PayPal Resources

Doing the You Tube [paypal-checkout](https://github.com/paypal/paypal-checkout) Deep Dive
was a great learning resource for how the button, code flow and different products work.

I published the completed exercises [here](https://github.com/jewelsjacobs/paypal-samples)

As the merchant referenced the Express Checkout Server REST product without any details, other than wanting to be able to "get up and running with it", I dove into anything that had to do with Express Checkout and any REST APIs associated with it.

I found there is ALOT.

[Express Checkout](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/)

I also dove into the SDKs and other projects using paypal APIs in hopes to create interactive demos.

### 3rd Party Resources

#### ChatBot with Watson
To mitigate the vagueness of the problem and help point a developer to the right asset, I was going to create a NLP chat bot. There is actually a lot of great info about Express Checkout, docs, code, the video, etc. Wouldn't it be great to talk to a cool guide?

I started playing around with my bluemix account until I realized this POC was too ambitious in the time I had:

https://www.ibm.com/watson/how-to-build-a-chatbot/

#### Sample Full Stack "Glitches"
To make it easier to see the relationship between the serverside REST API configuration and the Express Checkout Button, I took a look at [Glitch](https://glitch.com)

I tried to make a glitch out of the payal-checkout completed exercise repo which I have successfully [running on heroku](https://paypal-samples.herokuapp.com/)

[https://glitch.com/edit/#!/voracious-horse](https://glitch.com/edit/#!/voracious-horse)

Unfortunately I can't get it to work.  Glitch is a bit glitchy. Ha ha ha.

#### Docs and Codegen with APIMATIC
Hoping to allow developers to quickly generate an Express Checkout Server REST API and test it with a button, I looked at [APIMATIC](https://apimatic.io/).

I initially started creating a Postman collection with documentation for the PayPal Authentication, Payment Experience, and Payment APIs.  My thought was I could then import them into the APIMATIC Developerless API Portal and then everything would magically happen.

Unfortunately it took way to much time getting Postman to work with the Auth API and all of the other APIs. I had to use the Postman built in Auth 2.0 tool. I couldn't get all of the API methods documented: https://documenter.getpostman.com/view/619630/paypal-api/6tZ5kLY

Importing the collection into APIMATIC was a mess so I wound up further scaling down to just the Payment create and execute methods. The result was not exactly what I was looking for.

Ideally an embedded postman or maybe even a tweakable online mock server would be better.

### What else?
I would have liked to have done interactive video training for every SDK to create samples with buttons. Code samples provided. I also would LOVE to set up a REPL based training platform like Codeacademy [(Watson API on Codeacademy)](https://www.codecademy.com/learn/ibm-watson)

# Ideas I had on how to engage developers in PayPal products
After 4 years of running a Pair Programming meetup I found the main motivator for developers was to make money. Learn how to code for a startup or to get a job. PayPal products facilitate financial transactions. What if PayPal's Development OutReach reasources / assets focused on helping develolpers use PayPal products to make money?

There were a couple of ideas I had along these lines:
* Help developers learn in-demand marketable skills
* Help developers with tech startups

## Ecommerce Lab
I came across this cool site [Hack the Box](https://www.hackthebox.eu/). Although it was a subtle delivery, the free service offered role play in title, purpose, complexity and UI design. The appealing persona of the "hacker". The availability of a networked lab of fully functional VMs gave credability to the hands on experience. The progressive difficuly is an excellent learning device not to mention the gamification.  Learning a marketable skill and feeling cool the whole time.

My idea was to create a similar environment with a startup mogul role play persona. The goal to create a complex full stack e-commerce site built to scale, dynamic SEO and content, marketing analytics, email system integration, the works. The goal being scale with customers and products. Make lots of $$$$$$. The environment would be a lab. All of PayPal's products would be utilized.  Devs would learn a TON of marketable skills and how to make money regardless of whether they choose to use eCommerce or not. All step by step hands on challanges and gameification conventions.

