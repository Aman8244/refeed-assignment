import Task from "@/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const tasks = await Task.find({})

        return NextResponse.json({
            data: tasks
        })
    } catch (error) {
        return NextResponse.json({
            error,
            status:400
        })
    }
}

export async function POST(request: NextRequest) {
    try {
         
    } catch (error) {
        return NextResponse.json({
            error,
            status:400
        })
    }
}