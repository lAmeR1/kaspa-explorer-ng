import { Navigate, useParams } from "react-router";

export default function TxsIdRedirect() {
  const { id } = useParams();

  return <Navigate to={`/transactions/${id}`} replace />;
}
