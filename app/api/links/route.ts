import { db } from "@/db";
import { links } from "@/db/schema";
import { generateCode } from "@/utils/generateCode";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const allLinks = await db.select().from(links);

    return NextResponse.json({
        links: allLinks,
    });
}

export async function POST(req: Request) {
    let { code, targetUrl }: { code?: string; targetUrl: string } =
        await req.json();
    if (!targetUrl) {
        return NextResponse.json(
            {
                message: "Target Url is required",
            },
            {
                status: 400,
            }
        );
    }
    try {
        new URL(targetUrl);
    } catch {
        return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    if (!code || code.trim() === "") {
        code = generateCode();
    }

    const alreadyAvailable = await db
        .select()
        .from(links)
        .where(eq(links.code, code))
        .limit(1);
    if (alreadyAvailable.length > 0) {
        return NextResponse.json(
            {
                message: "link already exists",
            },
            {
                status: 409,
            }
        );
    }
    const res = await db.insert(links).values({
        code: code,
        targetUrl: targetUrl,
    });
    return NextResponse.json({
        message: "success",
        res,
    });
}
