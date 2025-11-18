"use client";

import { useEffect, useState } from "react";
import LinkForm from "@/components/LinkForm";
import LinksTable from "@/components/LinksTable";
import { Link } from "@/db/schema";

export default function Page() {
  const [links, setLinks] = useState<Link[]>([]);
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
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <LinkForm onCreated={loadLinks} />

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <LinksTable links={links} refresh={loadLinks} />
      )}
    </main>
  );
}
