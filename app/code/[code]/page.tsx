


export default async function StatsPage({ params }: { params: { code: string } }) {
  const { code } = await params;

    const data = await fetch(`${process.env.BASE_URL}/api/links/${code}`, {
    method: "GET",
  }).then((res) => res.json());



  if (!data.link) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20">
        <h1 className="text-2xl font-bold text-red-600">Link not found</h1>
        <p className="text-gray-500 mt-2">
          The short code <strong>{code}</strong> does not exist.
        </p>
      </div>
    );
  }

  const link = data.link;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-2xl font-bold">Stats for code: {link?.code}</h1>

      {/* Card */}
      <div className="p-4 rounded-lg border shadow bg-white space-y-3">
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
          <p className="font-semibold">
            {`${process.env.BASE_URL}/${link?.code}`}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Clicks:</p>
          <p className="font-semibold">{link?.totalClicks}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Clicked:</p>
          <p>{link?.lastClickedAt ? new Date(link?.lastClickedAt).toLocaleString() : "Never"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created At:</p>
          <p>{new Date(link?.createdAt!).toLocaleString()}</p>
        </div>

      </div>
    </div>
  );
}
