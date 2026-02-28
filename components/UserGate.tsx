'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function UserGate({ children }: Props) {
  return <>{children}</>;
}
