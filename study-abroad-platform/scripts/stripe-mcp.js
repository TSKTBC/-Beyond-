#!/usr/bin/env node

/**
 * Stripe MCP Server
 * 決済操作を提供
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.error('Error: STRIPE_SECRET_KEY must be set');
  process.exit(1);
}

const stripe = new Stripe(stripeKey);

const server = new Server(
  {
    name: 'stripe-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ツール一覧
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_payment_intent',
        description: 'Create a Stripe Payment Intent',
        inputSchema: {
          type: 'object',
          properties: {
            amount: { type: 'number', description: 'Amount in cents' },
            currency: { type: 'string', description: 'Currency code (e.g., usd, jpy)' },
            metadata: { type: 'object', description: 'Optional metadata' },
          },
          required: ['amount', 'currency'],
        },
      },
      {
        name: 'get_payment_intent',
        description: 'Retrieve a Payment Intent by ID',
        inputSchema: {
          type: 'object',
          properties: {
            paymentIntentId: { type: 'string', description: 'Payment Intent ID' },
          },
          required: ['paymentIntentId'],
        },
      },
      {
        name: 'create_customer',
        description: 'Create a Stripe customer',
        inputSchema: {
          type: 'object',
          properties: {
            email: { type: 'string', description: 'Customer email' },
            name: { type: 'string', description: 'Customer name' },
            metadata: { type: 'object', description: 'Optional metadata' },
          },
          required: ['email'],
        },
      },
      {
        name: 'get_customer',
        description: 'Retrieve a customer by ID',
        inputSchema: {
          type: 'object',
          properties: {
            customerId: { type: 'string', description: 'Customer ID' },
          },
          required: ['customerId'],
        },
      },
      {
        name: 'create_subscription',
        description: 'Create a subscription for a customer',
        inputSchema: {
          type: 'object',
          properties: {
            customerId: { type: 'string', description: 'Customer ID' },
            priceId: { type: 'string', description: 'Price ID' },
            metadata: { type: 'object', description: 'Optional metadata' },
          },
          required: ['customerId', 'priceId'],
        },
      },
      {
        name: 'list_products',
        description: 'List all products',
        inputSchema: {
          type: 'object',
          properties: {
            limit: { type: 'number', description: 'Limit number of results' },
          },
        },
      },
      {
        name: 'refund_payment',
        description: 'Refund a payment',
        inputSchema: {
          type: 'object',
          properties: {
            paymentIntentId: { type: 'string', description: 'Payment Intent ID' },
            amount: { type: 'number', description: 'Amount to refund in cents (optional, full refund if not specified)' },
          },
          required: ['paymentIntentId'],
        },
      },
    ],
  };
});

// ツール実行
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_payment_intent': {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: args.amount,
          currency: args.currency,
          metadata: args.metadata || {},
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(paymentIntent, null, 2) }],
        };
      }

      case 'get_payment_intent': {
        const paymentIntent = await stripe.paymentIntents.retrieve(args.paymentIntentId);

        return {
          content: [{ type: 'text', text: JSON.stringify(paymentIntent, null, 2) }],
        };
      }

      case 'create_customer': {
        const customer = await stripe.customers.create({
          email: args.email,
          name: args.name,
          metadata: args.metadata || {},
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(customer, null, 2) }],
        };
      }

      case 'get_customer': {
        const customer = await stripe.customers.retrieve(args.customerId);

        return {
          content: [{ type: 'text', text: JSON.stringify(customer, null, 2) }],
        };
      }

      case 'create_subscription': {
        const subscription = await stripe.subscriptions.create({
          customer: args.customerId,
          items: [{ price: args.priceId }],
          metadata: args.metadata || {},
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(subscription, null, 2) }],
        };
      }

      case 'list_products': {
        const products = await stripe.products.list({
          limit: args.limit || 10,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(products, null, 2) }],
        };
      }

      case 'refund_payment': {
        const refund = await stripe.refunds.create({
          payment_intent: args.paymentIntentId,
          amount: args.amount,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(refund, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Stripe MCP Server running on stdio');
}

main();
