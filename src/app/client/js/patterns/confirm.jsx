
import React from 'react';

export let confirm = {

    slug: 'confirm',

    name: `Confirmation`,

    fullName: `Express Checkout with Confirmation`,

    nosidebar: false,

    intro: (
        <p>Create a PayPal button and accept payments, with a confirmation page.</p>
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
    
            <div id="confirm" class="hidden">
                <div>Ship to:</div>
                <div><span id="recipient"></span>, <span id="line1"></span>, <span id="city"></span></div>
                <div><span id="state"></span>, <span id="zip"></span>, <span id="country"></span></div>
    
                <button id="confirmButton">Complete Payment</button>
            </div>
    
            <div id="thanks" class="hidden">
                Thanks, <span id="thanksname"></span>!
            </div>
    
            <script>
                paypal.Button.render({
    
                    env: '${ctx.env}', // sandbox | production
    
                    payment: function(data, actions) {
                        // Set up a url on your server to create the payment
                        var CREATE_URL = '${ctx.baseURL}/api/paypal/payment/create/';
                        
                        // Make a call to your server to set up the payment
                        return paypal.request.post(CREATE_URL)
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
    
                        // Get the payment details
    
                        return actions.payment.get().then(function(paymentData) {
    
                            // Display the payment details and a confirmation button
    
                            var shipping = paymentData.payer.payer_info.shipping_address;
    
                            document.querySelector('#recipient').innerText = shipping.recipient_name;
                            document.querySelector('#line1').innerText     = shipping.line1;
                            document.querySelector('#city').innerText      = shipping.city;
                            document.querySelector('#state').innerText     = shipping.state;
                            document.querySelector('#zip').innerText       = shipping.postal_code;
                            document.querySelector('#country').innerText   = shipping.country_code;
    
                            document.querySelector('#paypal-button-container').style.display = 'none';
                            document.querySelector('#confirm').style.display = 'block';
    
                            // Listen for click on confirm button
    
                            document.querySelector('#confirmButton').addEventListener('click', function() {
    
                                // Disable the button and show a loading message
    
                                document.querySelector('#confirm').innerText = 'Loading...';
                                document.querySelector('#confirm').disabled = true;
    
                                // Make a call to your server to execute the payment
                                return paypal.request.post(EXECUTE_URL, data).then(function (res) {
                                
                                    // Show a thank-you note
                                    
                                    document.querySelector('#thanksname').innerText = shipping.recipient_name;
    
                                    document.querySelector('#confirm').style.display = 'none';
                                    document.querySelector('#thanks').style.display = 'block';
                                });
    
                            });
                        });
                    }
    
                }, '#paypal-button-container');
    
            </script>
        </body>
    `
};
