
import React from 'react';

export let checkout = {

    slug: 'checkout',

    name: `Checkout Button`,

    fullName: `Express Checkout Custom Button`,

    nosidebar: false,

    intro: (
        <p>Customize your <b>PayPal Checkout</b> button with colors, sizes and shapes.</p>
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
                        label: 'checkout',
                        size:  'small',    // small | medium | large | responsive
                        shape: 'pill',     // pill | rect
                        color: 'blue'      // gold | blue | silver | black
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
