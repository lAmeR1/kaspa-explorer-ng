import Dashboard from "../Dashboard";

export function meta() {
  return [
    { title: "Kaspa Explorer | Track Blocks & Transactions" },
    {
      name: "description",
      content: "Kaspa Explorer. Track transactions, blocks, miners, and the BlockDAG in real-time.",
    },
    { name: "keywords", content: "Kaspa explorer, blockchain tracker, Kaspa blocks, transactions, miners, DAG" },
  ];
}

export default function Home() {
  return (
    <div className="text-base">
      <Dashboard />
    </div>
  );
}
