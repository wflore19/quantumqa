import { Dashboard } from '@quantumqa/quantumui';
import { type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { checkSessionToken } from '@/server/auth';

export default function HelloWorldPage() {
  return (
    <>
      <Dashboard.Title>Hello world!</Dashboard.Title>

      <Dashboard.Subheader>
        <div>Content</div>
      </Dashboard.Subheader>

      <Outlet />
    </>
  );
}
