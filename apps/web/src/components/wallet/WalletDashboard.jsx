"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function WalletDashboard() {
  const {
    data: session,
    isPending,
    error,
  } = authClient.useSession();

  if (isPending) {
    return <p>Loading your session...</p>;
  }

  if (error) {
    return <p role="alert">Could not load your session.</p>;
  }

  if (!session) {
    return <Link href="/login">Please sign in</Link>;
  }

  return (
    <section>
      <h2>Welcome, {session.user.name}</h2>
      <p>{session.user.email}</p>
    </section>
  );
}