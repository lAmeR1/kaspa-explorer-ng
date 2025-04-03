import type { Route } from "./+types/notfound";

export default function NotFound() {
  return (
    <div
      className="bg-primary/20 text-black p-6 py-8 text-center
     text-lg rounded-4xl my-4"
    >
      Whoops! Looks like you just opened a portal to the void.
      <br />
      The page you're hunting for is nowhere to be found. 🕳️✨
    </div>
  );
}
