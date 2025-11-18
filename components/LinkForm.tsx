"use client";

import { useState } from "react";

export default function LinkForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!url) {
      setError("URL is required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({
        targetUrl: url,
        code: customCode,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    setUrl("");
    setCustomCode("");
    onCreated(); // Refresh dashboard
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border rounded-lg shadow-sm space-y-3"
    >
      <h2 className="text-lg font-semibold">Create Short Link</h2>

      <input
        type="text"
        placeholder="Enter target URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Shorten URL"}
      </button>
    </form>
  );
}
