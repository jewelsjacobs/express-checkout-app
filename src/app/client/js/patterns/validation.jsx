
import React from 'react';

export let validation = {

    slug: 'validation',

    name: `Validation`,

    fullName: `Express Checkout with validation`,

    intro: (
        <p>Create a PayPal button and only trigger checkout when the form validates</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
        </head>

        <body>

            <p id="msg" class="hidden error">Please check the checkbox</p>
    
            <p>
                <label><input id="check" type="checkbox"> Check here to continue</label>
            </p>
    
            <div id="paypal-button-container"></div>
    
            <script>
    
                function isValid() {
                    return document.querySelector('#check').checked;
                }
    
                function onChangeCheckbox(handler) {
                    document.querySelector('#check').addEventListener('change', handler);
                }
    
                function toggleValidationMessage() {
                    document.querySelector('#msg').style.display = (isValid() ? 'none' : 'block');
                }
    
                function toggleButton(actions) {
                    return isValid() ? actions.enable() : actions.disable();
                }
    
                // Render the PayPal button
    
                paypal.Button.render({
    
                    // Set your environment
    
                    env: '${ctx.env}', // sandbox | production
    
                    validate: function(actions) {
                        toggleButton(actions);
    
                        onChangeCheckbox(function() {
                            toggleButton(actions);
                        });
                    },
    
                    onClick: function() {
                        toggleValidationMessage();
                    },
    
                    // Wait for the PayPal button to be clicked
    
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
