import { tailwindConfig } from '@quantumqa/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.tsx'],
};
