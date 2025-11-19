"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";

interface links {
    code: string;
    targetUrl: string;
    totalClicks: number;
    lastClickedAt: Date;
    createdAt: Date;
}

export default function StatsPage({ params }: { params: { code: string } }) {
    const { code }: { code: string } = React.use(params);

    const [data, setData] = useState({ link: null });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    
  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

    useEffect(() => {
        async function fetchLink() {
            try {
                setLoading(true);
                const res = await fetch(`/api/links/${code}`);
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchLink();
    }, [code]);

    if (loading) {
        return (
            <div className="w-full h-screen flex gap-2 justify-center items-center">
                <span className="loading loading-lg"></span>
                <p>Loading...</p>
            </div>
        );
    }

    if (!data.link) {
        return (
            <div className="max-w-xl mx-auto text-center mt-20">
                <h1 className="text-2xl font-bold text-red-600">
                    Link not found
                </h1>
                <p className="text-gray-500 mt-2">
                    The short code <strong>{code}</strong> does not exist.
                </p>
            </div>
        );
    }

    const link: links = data.link;

    return (
        <div className="w-[80%] mx-auto mt-10 p-4 space-y-6 py-20">
            <button className="btn btn-error" onClick={() => router.push("/")}>
                <BiArrowBack />
                <p>Back</p>
            </button>
            <h1 className="text-2xl font-bold">Stats for code: {link?.code}</h1>

            <div className="p-4 rounded-lg shadow-md  bg-white space-y-3 flex gap-5 flex-col lg:flex-row">
                <div className="flex flex-col gap-5 flex-1 justify-around">
                    <div>
                        <p className="text-sm text-gray-500">Original URL:</p>
                        <a
                            href={link?.targetUrl}
                            target="_blank"
                            className="text-blue-600 underline break-all"
                        >
                            {link?.targetUrl}
                        </a>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Short Link:</p>
                        <p className="font-semibold flex items-center gap-2">
                            <span>{`${process.env.NEXT_PUBLIC_BASE_URL}/${link?.code}`}</span>
                            <FaRegCopy className="text-sm hover:text-blue-600 cursor-pointer" onClick={() => copyText(`${process.env.NEXT_PUBLIC_BASE_URL}/${link?.code}`)}/>
                        </p>  
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 flex-1">
                    <div className="flex flex-col gap-4" >
                        <div className="bg-green-100 border border-green-200/50 px-6 py-3 flex flex-col items-start flex-1 w-70">
                            <p className="text-sm text-gray-500">
                                Total Clicks:
                            </p>
                            <p className="font-semibold">{link?.totalClicks}</p>
                        </div>

                        <div className="bg-yellow-100 border border-yellow-200/50 px-6 py-3 flex flex-col items-start flex-1 w-70">
                            <p className="text-sm text-gray-500">
                                Last Clicked:
                            </p>
                            <p>
                                {link?.lastClickedAt
                                    ? new Date(
                                          link?.lastClickedAt
                                      ).toLocaleString()
                                    : "Never"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="bg-orange-100 border border-orange-200/50 px-6 py-3 flex flex-col items-start flex-1 w-70">
                        <p className="text-sm text-gray-500">Created At:</p>
                        <p>{new Date(link?.createdAt!).toLocaleString()}</p>
                      </div>
                    <div className="bg-violet-100 border border-violet-200/50 px-6 py-3 flex flex-col items-start flex-1 w-70">
                        <p className="text-sm text-gray-500">
                            Last Clicked At:
                        </p>
                        <p>
                            {link?.lastClickedAt
                                ? new Date(
                                      link?.lastClickedAt!
                                  ).toLocaleString()
                                : "Never"}
                        </p>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
