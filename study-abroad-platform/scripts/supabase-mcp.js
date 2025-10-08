#!/usr/bin/env node

/**
 * Supabase MCP Server
 * データベース操作と認証を提供
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const server = new Server(
  {
    name: 'supabase-mcp',
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
        name: 'query_database',
        description: 'Execute a SELECT query on Supabase database',
        inputSchema: {
          type: 'object',
          properties: {
            table: { type: 'string', description: 'Table name' },
            select: { type: 'string', description: 'Columns to select (default: *)' },
            filters: { type: 'object', description: 'Filter conditions (eq, neq, gt, lt, etc.)' },
            limit: { type: 'number', description: 'Limit number of results' },
          },
          required: ['table'],
        },
      },
      {
        name: 'insert_data',
        description: 'Insert data into Supabase table',
        inputSchema: {
          type: 'object',
          properties: {
            table: { type: 'string', description: 'Table name' },
            data: { type: 'object', description: 'Data to insert' },
          },
          required: ['table', 'data'],
        },
      },
      {
        name: 'update_data',
        description: 'Update data in Supabase table',
        inputSchema: {
          type: 'object',
          properties: {
            table: { type: 'string', description: 'Table name' },
            data: { type: 'object', description: 'Data to update' },
            filters: { type: 'object', description: 'Filter conditions' },
          },
          required: ['table', 'data', 'filters'],
        },
      },
      {
        name: 'delete_data',
        description: 'Delete data from Supabase table',
        inputSchema: {
          type: 'object',
          properties: {
            table: { type: 'string', description: 'Table name' },
            filters: { type: 'object', description: 'Filter conditions' },
          },
          required: ['table', 'filters'],
        },
      },
      {
        name: 'get_user',
        description: 'Get user information by ID',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'User ID' },
          },
          required: ['userId'],
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
      case 'query_database': {
        let query = supabase.from(args.table).select(args.select || '*');

        if (args.filters) {
          Object.entries(args.filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        if (args.limit) {
          query = query.limit(args.limit);
        }

        const { data, error } = await query;

        if (error) throw error;

        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'insert_data': {
        const { data, error } = await supabase
          .from(args.table)
          .insert(args.data)
          .select();

        if (error) throw error;

        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'update_data': {
        let query = supabase.from(args.table).update(args.data);

        Object.entries(args.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });

        const { data, error } = await query.select();

        if (error) throw error;

        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'delete_data': {
        let query = supabase.from(args.table).delete();

        Object.entries(args.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });

        const { data, error } = await query.select();

        if (error) throw error;

        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'get_user': {
        const { data, error } = await supabase.auth.admin.getUserById(args.userId);

        if (error) throw error;

        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
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
  console.error('Supabase MCP Server running on stdio');
}

main();
