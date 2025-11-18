import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(request:Request,{ params } : {params:Promise<{ code: string }>}){

    const { code } = await params; 

    if(!code){
        return NextResponse.json({
            message:"code not found"
        },
        {
            status:404
        })
    }

    const link = await db.select().from(links).where(eq(links.code,code));
    if(link.length === 0){
        return NextResponse.json({
            message:"link not found"
        },
        {
            status:404
        })
    }
    if(link.length > 0){
        await db.update(links).set({
            totalClicks:link[0].totalClicks + 1,
            lastClickedAt:new Date()
        }).where(eq(links.code,code));
        return NextResponse.redirect(link[0].targetUrl,{
            status:302
        })
    }
}