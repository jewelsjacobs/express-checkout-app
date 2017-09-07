
import React from 'react';

export let credit = {

    slug: 'credit',

    name: `Credit Button`,

    fullName: `Express Checkout Custom Credit Button`,

    nosidebar: false,

    intro: (
        <p>Create a <b>PayPal CREDIT</b> button and initialize the credit flow.</p>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <div id="paypal-button-container"></div>

        <script>

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: '${ctx.env}', // sandbox | production

                // Specify the style of the button

                style: {
                    label: 'credit',
                    size:  'small', // small | medium | large | responsive
                    shape: 'rect',   // pill | rect
                    color: 'creditblue'   // creditblue | black
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
                            ],

                            payer: {
                                payment_method: 'paypal',
                                external_selected_funding_instrument_type: 'CREDIT'
                            }
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
    `
};
