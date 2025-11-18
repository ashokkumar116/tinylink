"use client";

import { Link } from "@/db/schema";

export default function LinksTable({
  links,
  refresh,
}: {
  links: Link[];
  refresh: () => void;
}) {
  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    refresh();
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  if (links.length === 0) {
    return <p className="text-center text-gray-600 mt-6">No links found.</p>;
  }

  return (
    <table className="w-full border-collapse mt-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Short Code</th>
          <th className="p-2 border">Target URL</th>
          <th className="p-2 border">Clicks</th>
          <th className="p-2 border">Last Clicked</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link) => (
          <tr key={link.id} className="border">
            <td className="p-2 border text-blue-600 font-semibold">
              <a href={`/code/${link.code}`} className="underline">
                {link.code}
              </a>
            </td>

            <td className="p-2 border max-w-[240px] truncate">
              {link.targetUrl}
            </td>

            <td className="p-2 border text-center">
              {link.totalClicks ?? 0}
            </td>

            <td className="p-2 border text-center text-sm">
              {link.lastClickedAt
                ? new Date(link.lastClickedAt).toLocaleString()
                : "Never"}
            </td>

            <td className="p-2 border text-center space-x-2">
              <button
                onClick={() =>
                  copyText(`${window.location.origin}/${link.code}`)
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Copy
              </button>

              <button
                onClick={() => deleteLink(link.code)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
