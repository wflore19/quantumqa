import { Button } from '@quantumqa/ui';
import uiStylesheet from '@quantumqa/ui/index.css?url';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import tailwindStylesheet from '@/tailwind.css?url';

export const meta: MetaFunction = () => {
  return [{ title: 'QuantumQA Admin' }];
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: uiStylesheet },
    { rel: 'stylesheet', href: tailwindStylesheet },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
