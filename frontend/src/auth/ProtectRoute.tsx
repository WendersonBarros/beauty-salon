import { Navigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import type { ReactElement } from "react";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isLoading, isError } = useSession();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <Navigate to="/login" replace />;

  return children;
}
