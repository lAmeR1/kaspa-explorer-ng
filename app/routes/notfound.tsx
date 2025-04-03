import type { Route } from "./+types/notfound";

export default function NotFound() {
  return (
    <div className="bg-primary/20 my-4 rounded-4xl p-6 py-8 text-center text-lg text-black">
      Whoops! Looks like you just opened a portal to the void.
      <br />
      The page you're hunting for is nowhere to be found. 🕳️✨
    </div>
  );
}
