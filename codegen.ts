import type { CodegenConfig } from '@graphql-codegen/cli';
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset';

const config: CodegenConfig = {
  schema:  'https://atjycrgmblfzyzxmmrca.supabase.co/graphql/v1', // Using your Expo environment variable or a local endpoint as fallback
  documents: '{supabase,components,screens,hooks}/**/*.{ts,tsx}', // Scan all files in relevant directories for GraphQL operations
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    'supabase/Apollo/gql': {
      preset: 'client',
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: 'string',
          Date: 'string',
          Time: 'string',
          Datetime: 'string',
          JSON: 'string',
          BigInt: 'string',
          BigFloat: 'string',
          Opaque: 'any',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['npm run prettier'], // optional
  },
};

export default config;
