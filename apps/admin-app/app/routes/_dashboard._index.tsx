import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

import { Route } from '@/utils/constants';

export async function loader({ request }: LoaderFunctionArgs) {
  return redirect(Route['/hello-world']);
}
