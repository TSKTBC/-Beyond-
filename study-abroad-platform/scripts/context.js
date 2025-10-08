#!/usr/bin/env node

/**
 * Context File
 * アプリケーション状態をAIと共有するためのコンテキスト管理
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';

const CONTEXT_FILE = path.join(process.cwd(), '.context.json');

// コンテキストデータの初期化
async function initContext() {
  try {
    await fs.access(CONTEXT_FILE);
  } catch {
    await fs.writeFile(CONTEXT_FILE, JSON.stringify({
      currentUser: null,
      currentPage: null,
      recentActions: [],
      applicationState: {},
      timestamp: new Date().toISOString(),
    }, null, 2));
  }
}

// コンテキストデータの読み込み
async function readContext() {
  const data = await fs.readFile(CONTEXT_FILE, 'utf-8');
  return JSON.parse(data);
}

// コンテキストデータの書き込み
async function writeContext(data) {
  await fs.writeFile(CONTEXT_FILE, JSON.stringify(data, null, 2));
}

const server = new Server(
  {
    name: 'context-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// リソース一覧
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'context://application/state',
        name: 'Application State',
        mimeType: 'application/json',
        description: 'Current application state and user context',
      },
    ],
  };
});

// リソース読み込み
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'context://application/state') {
    const context = await readContext();
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(context, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// ツール一覧
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_context',
        description: 'Get current application context',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'update_user',
        description: 'Update current user information',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'User ID' },
            email: { type: 'string', description: 'User email' },
            name: { type: 'string', description: 'User name' },
          },
          required: ['userId'],
        },
      },
      {
        name: 'update_page',
        description: 'Update current page information',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'Page path' },
            title: { type: 'string', description: 'Page title' },
          },
          required: ['path'],
        },
      },
      {
        name: 'add_action',
        description: 'Add a user action to recent actions',
        inputSchema: {
          type: 'object',
          properties: {
            action: { type: 'string', description: 'Action type' },
            details: { type: 'object', description: 'Action details' },
          },
          required: ['action'],
        },
      },
      {
        name: 'update_state',
        description: 'Update application state',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'State key' },
            value: { type: 'any', description: 'State value' },
          },
          required: ['key', 'value'],
        },
      },
      {
        name: 'clear_context',
        description: 'Clear all context data',
        inputSchema: {
          type: 'object',
          properties: {},
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
      case 'get_context': {
        const context = await readContext();
        return {
          content: [{ type: 'text', text: JSON.stringify(context, null, 2) }],
        };
      }

      case 'update_user': {
        const context = await readContext();
        context.currentUser = {
          userId: args.userId,
          email: args.email,
          name: args.name,
        };
        context.timestamp = new Date().toISOString();
        await writeContext(context);

        return {
          content: [{ type: 'text', text: 'User context updated' }],
        };
      }

      case 'update_page': {
        const context = await readContext();
        context.currentPage = {
          path: args.path,
          title: args.title,
        };
        context.timestamp = new Date().toISOString();
        await writeContext(context);

        return {
          content: [{ type: 'text', text: 'Page context updated' }],
        };
      }

      case 'add_action': {
        const context = await readContext();
        context.recentActions.unshift({
          action: args.action,
          details: args.details || {},
          timestamp: new Date().toISOString(),
        });

        // 最新50件のみ保持
        if (context.recentActions.length > 50) {
          context.recentActions = context.recentActions.slice(0, 50);
        }

        context.timestamp = new Date().toISOString();
        await writeContext(context);

        return {
          content: [{ type: 'text', text: 'Action added to context' }],
        };
      }

      case 'update_state': {
        const context = await readContext();
        context.applicationState[args.key] = args.value;
        context.timestamp = new Date().toISOString();
        await writeContext(context);

        return {
          content: [{ type: 'text', text: `State updated: ${args.key}` }],
        };
      }

      case 'clear_context': {
        await writeContext({
          currentUser: null,
          currentPage: null,
          recentActions: [],
          applicationState: {},
          timestamp: new Date().toISOString(),
        });

        return {
          content: [{ type: 'text', text: 'Context cleared' }],
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
  await initContext();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Context MCP Server running on stdio');
}

main();
