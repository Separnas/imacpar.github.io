use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function UserGate({ children }: Props) {
  // Just nu släpper vi bara igenom allt som normalt.
  // Du kan lägga in spärrar, logik osv senare om du vill.
  return <>{children}</>;
}