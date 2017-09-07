
import React from 'react';

export let mark = {

    slug: 'mark',

    name: `Mark`,

    fullName: `Express Checkout Mark Integration`,

    intro: (
        <p>Create a <b>PayPal</b> button and accept payments using a mark integration.</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
        </head>

        <body>

            <!-- Render the radio fields and button containers -->
    
            <label>
                <input type="radio" name="payment-option" value="paypal" checked>
                <img src="${ctx.baseURL}/static/img/paypal-mark.jpg" alt="Pay with Paypal">
            </label>
    
            <label>
                <input type="radio" name="payment-option" value="card">
                <img src="${ctx.baseURL}/static/img/card-mark.png" alt="Accepting Visa, Mastercard, Discover and American Express">
            </label>
    
            <div id="paypal-button-container"></div>
            <div id="card-button-container" class="hidden"><button>Continue</button></div>
    
            <script>
    
                // Helper functions
    
                function getElements(el) {
                    return Array.prototype.slice.call(document.querySelectorAll(el));
                }
    
                function hideElement(el) {
                    document.body.querySelector(el).style.display = 'none';
                }
    
                function showElement(el) {
                    document.body.querySelector(el).style.display = 'block';
                }
    
                // Listen for changes to the radio fields
    
                getElements('input[name=payment-option]').forEach(function(el) {
                    el.addEventListener('change', function(event) {
    
                        // If PayPal is selected, show the PayPal button
    
                        if (event.target.value === 'paypal') {
                            hideElement('#card-button-container');
                            showElement('#paypal-button-container');
                        }
    
                        // If Card is selected, show the standard continue button
    
                        if (event.target.value === 'card') {
                            showElement('#card-button-container');
                            hideElement('#paypal-button-container');
                        }
                    });
                });
    
                // Hide Non-PayPal button by default
    
                hideElement('#card-button-container');
    
                // Render the PayPal button
    
                paypal.Button.render({
    
                    env: '${ctx.env}',
            
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
