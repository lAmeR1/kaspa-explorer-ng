import { redirect } from "react-router";

export async function loader({ params }: { params: { id: string } }) {
  return redirect(`/transactions/${params.id}`);
}

export default function TxsIdRedirect() {
  return null;
}
