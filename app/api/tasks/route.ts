import { DbConfig } from "@/DBConfig/DbConfig";
import Task from "@/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await DbConfig();
        const tasks = await Task.find({})

        return NextResponse.json({
            data: tasks
        })
    } catch (error) {
        return NextResponse.json({
            error,
            status: 400
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        await DbConfig();
        const body = await request.json();
        const { title, description, status } = body;
        const task = await new Task({
            title,
            description,
            status
        }).save();
        return NextResponse.json({
            data: task
        });
    } catch (error) {
        return NextResponse.json({
            error,
            status: 400
        })
    }
}

