"use client";
import { MouseEventHandler, useEffect, useState } from "react";

export default function Button({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}) {

  return (
    <button
      className={`px-6 py-3 border border-secondary hover:bg-secondary rounded-md transition duration-400 ease-in-out fill-blue-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
