import { Dashboard, Divider } from '@quantumqa/quantumui';
import { type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import {
  BookOpen,
  Calendar,
  Gift,
  HelpCircle,
  Layers,
  MapPin,
  Target,
  ToggleRight,
  User,
  Video,
} from 'react-feather';

import { checkSessionToken } from '@/server/auth';
import { Route } from '@/utils/routes';

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await checkSessionToken(request);

  return {
    token,
  };
}

export default function DashboardLayout() {
  const pendingApplications = 0;
  const isAmbassador = false;

  return (
    <Dashboard>
      <Dashboard.Sidebar>
        <div className="mb-8 flex w-full items-center justify-between">
          <Dashboard.CompanyLogo />
          <Dashboard.CloseMenuButton />
        </div>

        <Dashboard.Navigation>
          <Dashboard.NavigationList>
            {isAmbassador ? (
              <>
                <Dashboard.NavigationLink
                  icon={<Layers />}
                  label={`Applications (${pendingApplications})`}
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<Video />}
                  label="Onboarding Sessions"
                  pathname={Route['/']}
                />
              </>
            ) : (
              <>
                <Dashboard.NavigationLink
                  icon={<Layers />}
                  label={`Hello World`}
                  pathname={Route['/hello-world']}
                />
                <Dashboard.NavigationLink
                  icon={<User />}
                  label="Students"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<User />}
                  label="Admins"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<Gift />}
                  label="Gamification"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<Video />}
                  label="Onboarding Sessions"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<Calendar />}
                  label="Events"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<BookOpen />}
                  label="Resume Books"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<HelpCircle />}
                  label="Surveys"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<MapPin />}
                  label="Schools"
                  pathname={Route['/']}
                />

                <div className="my-2">
                  <Divider />
                </div>

                <Dashboard.NavigationLink
                  icon={<ToggleRight />}
                  label="Feature Flags"
                  pathname={Route['/']}
                />
                <Dashboard.NavigationLink
                  icon={<Target />}
                  label="Bull"
                  pathname={Route['/']}
                />
              </>
            )}
          </Dashboard.NavigationList>
        </Dashboard.Navigation>

        <Dashboard.LogoutForm />
      </Dashboard.Sidebar>

      <Dashboard.Page className="max-h-screen overflow-auto">
        <Dashboard.MenuButton />
        <Outlet />
      </Dashboard.Page>
    </Dashboard>
  );
}
