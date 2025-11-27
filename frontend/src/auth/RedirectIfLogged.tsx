import { Navigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import type { ReactElement } from "react";

export default function RedirectIfLogged({ children }: { children: ReactElement }) {
  const { data, isLoading } = useSession();

  if (isLoading) return children;

  if (data) return <Navigate to="/admin" replace />;

  return children;
}
