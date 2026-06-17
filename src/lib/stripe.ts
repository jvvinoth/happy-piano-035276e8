/**
 * Stripe Integration Helper
 * 
 * This file contains the client-side logic for Stripe checkout.
 * In production, you need to:
 * 1. Set up a backend endpoint (e.g., /api/create-checkout-session)
 * 2. Install @stripe/stripe-js: npm install @stripe/stripe-js
 * 3. Set up Stripe webhook handlers for subscription events
 * 4. Replace the placeholder API_ENDPOINT with your actual backend URL
 */

// Configuration
const API_ENDPOINT = '/api/create-checkout-session'; // Replace with your backend URL
// const STRIPE_PUBLISHABLE_KEY = 'pk_test_...'; // Add your Stripe publishable key

export interface CheckoutSessionData {
  priceId: string;
  planName: string;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * Create a Stripe Checkout session for monthly recurring subscription
 */
export async function createCheckoutSession(data: CheckoutSessionData): Promise<string> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: data.priceId,
      planName: data.planName,
      mode: 'subscription', // Monthly recurring
      successUrl: data.successUrl || `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: data.cancelUrl || window.location.href,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(priceId: string, planName: string): Promise<void> {
  try {
    const checkoutUrl = await createCheckoutSession({ priceId, planName });
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

/**
 * Backend Setup Guide (Node.js/Express example)
 * 
 * Install dependencies:
 * npm install stripe express
 * 
 * Create endpoint:
 * 
 * const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 * 
 * app.post('/api/create-checkout-session', async (req, res) => {
 *   const { priceId, planName, successUrl, cancelUrl } = req.body;
 * 
 *   try {
 *     const session = await stripe.checkout.sessions.create({
 *       mode: 'subscription',
 *       payment_method_types: ['card'],
 *       line_items: [
 *         {
 *           price: priceId,
 *           quantity: 1,
 *         },
 *       ],
 *       success_url: successUrl,
 *       cancel_url: cancelUrl,
 *     });
 * 
 *     res.json({ url: session.url });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * });
 * 
 * 
 * Stripe Dashboard Setup:
 * 1. Create Products in Stripe Dashboard for each course
 * 2. Create recurring monthly Prices for each product:
 *    - 入門: ¥8,000/month
 *    - 初級: ¥10,000/month
 *    - 中級: ¥12,000/month
 *    - 上級: ¥16,000/month
 * 3. Copy the Price IDs and replace them in siteContent.ts
 * 4. Set up webhooks to handle subscription events (subscription.created, subscription.updated, etc.)
 */
