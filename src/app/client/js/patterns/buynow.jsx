
import React from 'react';

export let buynow = {

    slug: 'buynow',

    name: `Buy Now Button`,

    fullName: `Express Checkout Custom Buy Now Button`,

    nosidebar: false,

    intro: (
        <p>Create a <b>Buy Now</b> button.</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
        </head>

        <body>
            <div id="paypal-button-container"></div>
    
            <script>
    
                // Render the PayPal button
    
                paypal.Button.render({
    
                    // Set your environment
    
                    env: '${ctx.env}', // sandbox | production
    
                    // Specify the style of the button
    
                    style: {
                        label: 'buynow',
                        fundingicons: true, // optional
                        branding: true, // optional
                        size:  'small', // small | medium | large | responsive
                        shape: 'rect',   // pill | rect
                        color: 'gold'   // gold | blue | silve | black
                    },
    
                    // payment() is called when the button is clicked
                    payment: function() {
    
                        // Set up a url on your server to create the payment
                        var CREATE_URL = '${ctx.baseURL}/api/paypal/payment/create/';
    
                        // Make a call to your server to set up the payment
                        return paypal.request.post(CREATE_URL)
                            .then(function(res) {
                                return res.paymentID;
                            });
                    },
    
                    // onAuthorize() is called when the buyer approves the payment
                    onAuthorize: function(data, actions) {
    
                        // Set up a url on your server to execute the payment
                        var EXECUTE_URL = '${ctx.baseURL}/api/paypal/payment/execute/';
    
                        // Set up the data you need to pass to your server
                        var data = {
                            paymentID: data.paymentID,
                            payerID: data.payerID
                        };
    
                        // Make a call to your server to execute the payment
                        return paypal.request.post(EXECUTE_URL, data)
                            .then(function (res) {
                                window.alert('Payment Complete!');
                            });
                    }
    
                }, '#paypal-button-container');
    
            </script>
        </body>
    `
};
