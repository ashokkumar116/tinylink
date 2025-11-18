import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(request:Request,{params}:{params:Promise<{code:string}>}){
    const {code} = await params;

    const link = await db.select().from(links).where(eq(links.code,code));
    if(link.length === 0){
        return NextResponse.json({
            message:"link not found"
        },
        {
            status:404
        })
    }
    return NextResponse.json({
        link:link[0]
    })

}

export async function DELETE(request:Request,{params}:{params:Promise<{code:string}>}){
    const {code} = await params;
    const res = await db.delete(links).where(eq(links.code,code));
    if(res.rowCount === 0){
        return NextResponse.json({
            message:"link not found"
        },
        {
            status:404
        })
    }
    return NextResponse.json({
        message:"Deleted",
        res
    })

}