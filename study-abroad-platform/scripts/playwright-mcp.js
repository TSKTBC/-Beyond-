#!/usr/bin/env node

/**
 * Playwright MCP Server
 * 自動E2Eテストを提供
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { chromium } from 'playwright';

let browser = null;
let context = null;
let page = null;

const server = new Server(
  {
    name: 'playwright-mcp',
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
        name: 'launch_browser',
        description: 'Launch a browser instance',
        inputSchema: {
          type: 'object',
          properties: {
            headless: { type: 'boolean', description: 'Run in headless mode (default: true)' },
          },
        },
      },
      {
        name: 'close_browser',
        description: 'Close the browser instance',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'navigate',
        description: 'Navigate to a URL',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL to navigate to' },
          },
          required: ['url'],
        },
      },
      {
        name: 'click',
        description: 'Click an element',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector' },
          },
          required: ['selector'],
        },
      },
      {
        name: 'fill',
        description: 'Fill an input field',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector' },
            value: { type: 'string', description: 'Value to fill' },
          },
          required: ['selector', 'value'],
        },
      },
      {
        name: 'get_text',
        description: 'Get text content of an element',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector' },
          },
          required: ['selector'],
        },
      },
      {
        name: 'screenshot',
        description: 'Take a screenshot',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path to save screenshot' },
            fullPage: { type: 'boolean', description: 'Capture full page (default: false)' },
          },
          required: ['path'],
        },
      },
      {
        name: 'wait_for_selector',
        description: 'Wait for an element to appear',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector' },
            timeout: { type: 'number', description: 'Timeout in milliseconds (default: 30000)' },
          },
          required: ['selector'],
        },
      },
      {
        name: 'evaluate',
        description: 'Execute JavaScript in the page context',
        inputSchema: {
          type: 'object',
          properties: {
            script: { type: 'string', description: 'JavaScript code to execute' },
          },
          required: ['script'],
        },
      },
      {
        name: 'assert_text',
        description: 'Assert that an element contains specific text',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector' },
            expectedText: { type: 'string', description: 'Expected text content' },
          },
          required: ['selector', 'expectedText'],
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
      case 'launch_browser': {
        if (browser) {
          throw new Error('Browser already launched');
        }

        browser = await chromium.launch({
          headless: args.headless !== false,
        });
        context = await browser.newContext();
        page = await context.newPage();

        return {
          content: [{ type: 'text', text: 'Browser launched successfully' }],
        };
      }

      case 'close_browser': {
        if (!browser) {
          throw new Error('No browser instance found');
        }

        await browser.close();
        browser = null;
        context = null;
        page = null;

        return {
          content: [{ type: 'text', text: 'Browser closed successfully' }],
        };
      }

      case 'navigate': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        await page.goto(args.url);

        return {
          content: [{ type: 'text', text: `Navigated to ${args.url}` }],
        };
      }

      case 'click': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        await page.click(args.selector);

        return {
          content: [{ type: 'text', text: `Clicked ${args.selector}` }],
        };
      }

      case 'fill': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        await page.fill(args.selector, args.value);

        return {
          content: [{ type: 'text', text: `Filled ${args.selector} with "${args.value}"` }],
        };
      }

      case 'get_text': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        const text = await page.textContent(args.selector);

        return {
          content: [{ type: 'text', text: text || '' }],
        };
      }

      case 'screenshot': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        await page.screenshot({
          path: args.path,
          fullPage: args.fullPage || false,
        });

        return {
          content: [{ type: 'text', text: `Screenshot saved to ${args.path}` }],
        };
      }

      case 'wait_for_selector': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        await page.waitForSelector(args.selector, {
          timeout: args.timeout || 30000,
        });

        return {
          content: [{ type: 'text', text: `Element ${args.selector} appeared` }],
        };
      }

      case 'evaluate': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        const result = await page.evaluate(args.script);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'assert_text': {
        if (!page) {
          throw new Error('No page instance. Launch browser first.');
        }

        const text = await page.textContent(args.selector);

        if (text !== args.expectedText) {
          throw new Error(`Expected "${args.expectedText}" but got "${text}"`);
        }

        return {
          content: [{ type: 'text', text: `Assertion passed: ${args.selector} contains "${args.expectedText}"` }],
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
  console.error('Playwright MCP Server running on stdio');
}

main();

// クリーンアップ
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});
