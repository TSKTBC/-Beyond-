#!/usr/bin/env node

/**
 * Notion MCP Server
 * コンテンツ取得を提供
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Client } from '@notionhq/client';

const notionKey = process.env.NOTION_API_KEY;

if (!notionKey) {
  console.error('Error: NOTION_API_KEY must be set');
  process.exit(1);
}

const notion = new Client({ auth: notionKey });

const server = new Server(
  {
    name: 'notion-mcp',
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
        name: 'get_page',
        description: 'Retrieve a Notion page by ID',
        inputSchema: {
          type: 'object',
          properties: {
            pageId: { type: 'string', description: 'Page ID' },
          },
          required: ['pageId'],
        },
      },
      {
        name: 'get_page_content',
        description: 'Retrieve page content (blocks) by page ID',
        inputSchema: {
          type: 'object',
          properties: {
            pageId: { type: 'string', description: 'Page ID' },
          },
          required: ['pageId'],
        },
      },
      {
        name: 'query_database',
        description: 'Query a Notion database',
        inputSchema: {
          type: 'object',
          properties: {
            databaseId: { type: 'string', description: 'Database ID' },
            filter: { type: 'object', description: 'Optional filter object' },
            sorts: { type: 'array', description: 'Optional sort array' },
          },
          required: ['databaseId'],
        },
      },
      {
        name: 'search',
        description: 'Search Notion workspace',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' },
            filter: { type: 'object', description: 'Optional filter (type: page or database)' },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_database',
        description: 'Retrieve database information',
        inputSchema: {
          type: 'object',
          properties: {
            databaseId: { type: 'string', description: 'Database ID' },
          },
          required: ['databaseId'],
        },
      },
      {
        name: 'create_page',
        description: 'Create a new page in a database',
        inputSchema: {
          type: 'object',
          properties: {
            databaseId: { type: 'string', description: 'Parent database ID' },
            properties: { type: 'object', description: 'Page properties' },
            children: { type: 'array', description: 'Page content blocks' },
          },
          required: ['databaseId', 'properties'],
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
      case 'get_page': {
        const page = await notion.pages.retrieve({ page_id: args.pageId });

        return {
          content: [{ type: 'text', text: JSON.stringify(page, null, 2) }],
        };
      }

      case 'get_page_content': {
        const blocks = await notion.blocks.children.list({
          block_id: args.pageId,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(blocks, null, 2) }],
        };
      }

      case 'query_database': {
        const response = await notion.databases.query({
          database_id: args.databaseId,
          filter: args.filter,
          sorts: args.sorts,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
        };
      }

      case 'search': {
        const response = await notion.search({
          query: args.query,
          filter: args.filter,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
        };
      }

      case 'get_database': {
        const database = await notion.databases.retrieve({
          database_id: args.databaseId,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(database, null, 2) }],
        };
      }

      case 'create_page': {
        const page = await notion.pages.create({
          parent: { database_id: args.databaseId },
          properties: args.properties,
          children: args.children || [],
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(page, null, 2) }],
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
  console.error('Notion MCP Server running on stdio');
}

main();
