import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function TxsRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/transactions", { replace: true });
  }, [navigate]);

  return null;
}
