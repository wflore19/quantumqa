const ROUTES = ['/', '/hello-world'] as const;

export type Route = (typeof ROUTES)[number];

type RouteMap = {
  [Key in Route]: Key;
};

export const Route = ROUTES.reduce((result, route) => {
  Object.assign(result, { [route]: route });

  return result;
}, {} as RouteMap);
