"use client";

import { Link } from "@/db/schema";
import { useRouter } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";

export default function LinksTable({
  links,
  refresh,
}: {
  links: Link[];
  refresh: () => void;
}) {
  const [loading,setLoading] = useState(false);

  async function deleteLink(code: string) {
    try {
      setLoading(true);
      await fetch(`/api/links/${code}`, { method: "DELETE" });
      toast.success("Link deleted");
      refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }}

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  if (links.length === 0) {
    return <p className="text-center text-gray-600 mt-6">No links found.</p>;
  }

  const router = useRouter();

  return (
    <DataTable value={links} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className="text-sm" >
      <Column field="code" header="Code" body={(rowData)=><button className="bg-blue-100 border border-blue-100/60 px-5 py-1 rounded-lg cursor-pointer flex items-center gap-2" onClick={()=>router.push(`/code/${rowData.code}`)}><p>{rowData.code}</p><FaExternalLinkAlt className="text-sm"/>  </button>} />
      <Column field="targetUrl" header="Target URL" />
      <Column field="totalClicks" header="Total Clicks" />
      <Column header="Actions" body={(link) => (
        <div className="flex gap-2">
          <button
            onClick={() => copyText(`${window.location.origin}/${link.code}`)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 cursor-pointer text-sm"
          >
            <FaRegCopy className="text-sm" />
            <p>Copy</p>
          </button>
          <button
            onClick={() => deleteLink(link.code)}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-2 cursor-pointer text-sm"
          >
            {loading ? (
              <span className="loading loading-sm"></span>
            ) : (
              <>
                <MdDeleteOutline className="text-sm" />
                <p>Delete</p>
              </>
            )}
          </button>
        </div>
      )} />
    </DataTable>
  );
}
