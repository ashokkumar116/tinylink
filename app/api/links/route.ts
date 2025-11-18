import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request:Request){

    const allLinks  = await db.select().from(links);

    return NextResponse.json({
        links:allLinks[0]
    })
}

export async function POST(req:Request){
    const {code,targetUrl} : {code:string,targetUrl:string} = await req.json();
    const alreadyAvailable = await db.select().from(links).where(eq(links.code,code));
    if(alreadyAvailable.length > 0){
        return NextResponse.json({
            message:"link already exists"
        },
        {
            status:409
        })
    }
    const res = await db.insert(links).values({
        code:code,
        targetUrl:targetUrl
    })
    return NextResponse.json({
        message:"success",
        res
    })
}