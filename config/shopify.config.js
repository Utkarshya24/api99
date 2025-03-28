// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
// import dotenv from 'dotenv';
// import * as runtime from '@shopify/shopify-api/dist/esm/runtime/platforms/node'; // Import the Node.js runtime adapter

// // Set the runtime adapter for Node.js
// runtime.setAbstractRuntimeString();
// dotenv.config();
// // Configure the runtime adapter for Node.js
// setLibraryOptions({
//     restClient: 'node-fetch',
//   });
// var scope="read_products,write_products,read_inventory,write_inventory,read_orders,write_orders"
// var hostName="https://unibazar.in"

// export const shopify = shopifyApi({
//   apiKey: process.env.SHOPIFY_CLIENT_ID ||"b08f26e1fce35ca8f6930b01360b8055",
//   apiSecretKey: process.env.SHOPIFY_CLIENT_SECRET || "8c19427dc18e08cffb77e81adc84cae4",
//   scopes: process.env.SHOPIFY_SCOPES.split(',') || scope.split(","),
//   hostName: process.env.HOST.replace(/https?:\/\//, '') || hostName.replace(/https?:\/\//, ''), // Remove protocol (e.g., 'yourdomain.com')
//   apiVersion: LATEST_API_VERSION,
//   isEmbeddedApp: false, // Set to true if you're building an embedded app
// });

import '@shopify/shopify-api/adapters/node';
import {shopifyApi, LATEST_API_VERSION} from '@shopify/shopify-api';
import express from 'express';

export const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: 'APIKeyFromb08f26e1fce35ca8f6930b01360b8055PartnersDashboard',
  apiSecretKey: '8c19427dc18e08cffb77e81adc84cae4',
  scopes: ['read_products,write_products,read_inventory,write_inventory,read_orders,write_orders'],
  hostName: 'https://unibazar.in',
  isEmbeddedApp: false, // Set to true if you're building an embedded app
  apiVersion: LATEST_API_VERSION,
  
});
