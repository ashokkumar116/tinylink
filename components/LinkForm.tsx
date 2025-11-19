"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";

export default function LinkForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!url) {
      toast.error("URL is required");
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
      toast.error(data.message);
      return;
    }
    toast.success("Link created");

    setUrl("");
    setCustomCode("");
    onCreated();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white rounded-lg shadow-md space-y-3"
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

      <button
        disabled={loading}
        className="cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4 py-2 rounded hover:scale-105 transition-all disabled:bg-gray-400 flex items-center justify-center"
      >
        {loading ? <span className="loading loading-lg"></span> : <p className="flex items-center gap-2"><LiaCompressArrowsAltSolid className="mr-2" /><span>Shorten URL</span></p>}
      </button>
    </form>
  );
}
