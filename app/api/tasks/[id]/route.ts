import { DbConfig } from "@/DBConfig/DbConfig";
import Task from "@/models/Tasks";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await DbConfig();
        const id = request.url.slice(32, request.url.length);
        const objectId = new mongoose.Types.ObjectId(id);
        const task = await Task.find({ id: objectId });
        return NextResponse.json({
            data: task
        })
    } catch (error) {
        return NextResponse.json({
            error,
            status: 400
        })
    }
}

export async function PUT(request: NextRequest) {
    try {
        await DbConfig();
        const id = request.url.slice(32, request.url.length);
        const objectId = new mongoose.Types.ObjectId(id);
        const body = await request.json();
        const { title, description, status } = body;
        let updatedTask;
        if (title !== null || title !== undefined) {
            updatedTask = await Task.findOneAndUpdate({ id: objectId }, {
                title: title
            });
        }
        if (description !== null || description !== undefined) {
            updatedTask = await Task.findOneAndUpdate({ id: objectId }, {
                description: description
            });
        }
        if (status !== null || status !== undefined) {
            updatedTask = await Task.findOneAndUpdate({ id: objectId }, {
                status: status
            });
        }
        return NextResponse.json({
            message: "Successfully Updated Task",
            data: updatedTask
        })
    } catch (error) {
        return NextResponse.json({
            error,
            status: 400
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.url.slice(32, request.url.length);
        const objectId = new mongoose.Types.ObjectId(id);
        const deletedTask = await Task.findOneAndDelete({id:objectId});
        return NextResponse.json({
            message: "Successfully Deleted Task",
            data: deletedTask
        })
    } catch (error) {
        return NextResponse.json({
            error,
            status: 400
        })
    }
}