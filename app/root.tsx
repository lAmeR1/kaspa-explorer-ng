import type { Route } from "./+types/root";
import "./app.css";
import ErrorIcon from "./assets/error.svg";
import Info from "./assets/info.svg";
import { MarketDataProvider } from "./context/MarketDataProvider";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import MainBox from "./layout/MainBox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Kaspa Explorer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-start text-sm sm:text-base">
          <QueryClientProvider client={queryClient}>
            <MarketDataProvider>
              <Header expanded={expanded} setExpanded={setExpanded} />
              {!expanded && (
                <>
                  <div className="flex w-full max-w-[1600px] grow flex-col items-center justify-start gap-y-2 py-2 sm:px-2">
                    {children}
                  </div>
                  <Footer />
                </>
              )}
            </MarketDataProvider>
          </QueryClientProvider>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: "always",
      staleTime: Infinity,
    },
  },
});

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log(error);
  return (
    <MainBox>
      <div className="grid w-full grid-cols-1 gap-x-18 gap-y-2 rounded-4xl bg-white p-4 text-left text-nowrap text-black sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="flex flex-row items-center text-2xl sm:col-span-2">
          <ErrorIcon className="mr-2 h-8 w-8" />
          Error occured
        </div>

        <div className="mt-4 text-black sm:col-span-2">Error information</div>
        {isRouteErrorResponse(error) && (
          <>
            <FieldName name="Error status" />
            <FieldValue value={`${error.status} ${error.statusText}`} />
            <FieldName name="Error data" />
            <FieldValue value={error.data} />
          </>
        )}
        {error instanceof Error && (
          <>
            <FieldName name="Error message" />
            <FieldValue value={error.message} />
            <FieldName name="Error stack" />
            <FieldValue value={error.stack} />
          </>
        )}
      </div>
    </MainBox>
  );
}

export default function App() {
  return <Outlet />;
}

const FieldName = ({ name }: { name: string }) => (
  <div className="flex flex-row items-start fill-gray-500 text-gray-500 sm:col-start-1">
    <div className="flex flex-row items-center">
      <Info className="mr-1 h-4 w-4" />
      <span>{name}</span>
    </div>
  </div>
);

const FieldValue = ({ value }: { value: string | React.ReactNode }) => <span className="overflow-hidden">{value}</span>;
