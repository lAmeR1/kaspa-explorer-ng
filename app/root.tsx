import {Links, Meta, Outlet, Scripts, ScrollRestoration,} from "react-router";

import type {Route} from "./+types/root";
import "./app.css";
import {useState} from "react";
import Header from "~/header/Header";
import Footer from "~/footer/Footer";

export const links: Route.LinksFunction = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
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

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>Kaspa Explorer</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
                  rel="stylesheet"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <div className="flex flex-col h-screen w-full items-center justify-start">
            {children}
        </div>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    const [expanded, setExpanded] = useState(false);

    return <><Header expanded={expanded} setExpanded={setExpanded}/>
        {!expanded && <>
            <div className="grow w-full max-w-[1600px] flex flex-col items-center justify-start px-2 py-2 gap-y-2">
                <Outlet/>
            </div>
            <Footer/></>}
    </>;
}

