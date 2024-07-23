import { Dashboard } from '@quantumqa/ui';
import { Outlet } from '@remix-run/react';

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
