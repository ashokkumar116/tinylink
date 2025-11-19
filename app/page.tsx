"use client";

import { useEffect, useState } from "react";
import LinkForm from "@/components/LinkForm";
import LinksTable from "@/components/LinksTable";
import { LinkProps } from "next/link";

export default function Page() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLinks() {
    setLoading(true);
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data.links);
    setLoading(false);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6 my-20">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <LinkForm onCreated={loadLinks} />

      {loading ? (
        <div className="flex items-center gap-3 justify-center">
          <span className="loading loading-lg"></span>
          <p>Loading...</p>
        </div>
      ) : (
        <LinksTable links={links} refresh={loadLinks} />
      )}
    </main>
  );
}
