import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blocks", "./routes/blocks.tsx"),
  route("blocks/:blockId", "./routes/blockdetails.tsx"),
  route("transactions", "./routes/transactions.tsx"),
  route("transactions/:transactionId", "./routes/transactiondetails.tsx"),
  route("addresses", "./routes/addresses.tsx"),
  route("addresses/:address", "./routes/addressdetails.tsx"),

  route("donate", "./routes/donate.tsx"),
  route("*", "./routes/notfound.tsx"),
  // route("/transactions", "routes/transactions.tsx"),
] satisfies RouteConfig;
