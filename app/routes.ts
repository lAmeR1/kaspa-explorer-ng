import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("blocks", "./routes/blocks.tsx"),

    route("*", "./routes/notfound.tsx"),
    // route("/transactions", "routes/transactions.tsx"),
] satisfies RouteConfig;
