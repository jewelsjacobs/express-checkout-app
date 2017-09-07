
import React from 'react';

export let generic = {

    slug: 'generic',

    name: `Generic Button`,

    fullName: `Express Generic Custom Button`,

    nosidebar: false,

    intro: (
        <p>Customize your <b>PayPal Generic</b> button with colors, sizes and shapes.</p>
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
                        label: 'generic',
                        size:  'medium',    // small | medium | large | responsive
                        shape: 'rect',     // pill | rect
                        color: 'black',     // gold | blue | silver | black
                        tagline: false    
                    },
            
                    // Wait for the PayPal button to be clicked
                    
                    payment: function(data, actions) {
    
                        // Set up a url on your server to create the payment
                        var CREATE_URL = '${ctx.baseURL}/api/paypal/payment/create/';
                        
                        var data = {
                            payment: {
                                transactions: [
                                    {
                                        amount: { total: '0.01', currency: 'USD' }
                                    }
                                ]
                            }
                        };
                        
                        // Make a call to your server to set up the payment
                        return paypal.request.post(CREATE_URL, data)
                            .then(function(res) {
                                return res.paymentID;
                            });
                    },
    
                    // Wait for the payment to be authorized by the customer
    
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
                    },
    
                }, '#paypal-button-container');
    
            </script>
        </body>
    `
};
