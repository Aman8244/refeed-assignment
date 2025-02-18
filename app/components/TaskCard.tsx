"use client"
import { ITasks } from '@/types/TaskInterface';
import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { CircleCheck, CircleDot, CircleEllipsis, Clock, Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDispatch } from 'react-redux';
import { DeleteById } from '../features/tasks/TaskSlice';

const colors = ['#e1f5f2', '#f2a3c7', '#b2e0b2', '#e6cfcf', '#f9e4b7'];

interface TaskCardProps extends ITasks {
    index: number;
}

const TaskCard = ({ id, title, description, status, dueDate, index }: TaskCardProps) => {
    const router = useRouter();
    const backgroundColor = colors[index % colors.length];
    const dispatch = useDispatch();
    const handleTaskDelete = async()=>{
        try {
            await fetch(`/api/tasks/${id}`,{
                method:"DELETE"
            }).then(()=>{
                dispatch(DeleteById(id))
            })
        } catch (error) {
            alert("Some Error Occured Please Try Again.")
        }
    }
    return (
        <div>
            <Card

                className="text-black cursor-pointer"
                style={{ backgroundColor }}
            >
                <CardHeader className='grid gap-2 grid-cols-8'>
                    <CardTitle onClick={() => router.push(`/tasks/${id}`)} className='col-span-6 capitalize hover:text-gray-600 text-[1.6rem] truncate' >{title}</CardTitle>
                    <div className='flex col-span-1 items-center  text-[.875rem] rounded-[32px] justify-center '>
                        {status === "pending" ? <CircleDot className='' /> : status === "in-progress" ? <CircleEllipsis /> : <CircleCheck />}
                    </div>
                    <div className='col-span-1 flex items-center justify-center'>
                        <AlertDialog>
                            <AlertDialogTrigger><Trash2 /></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this task.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleTaskDelete} >Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
                <CardContent onClick={() => router.push(`/tasks/${id}`)}>
                    <p className='truncate text-gray-600 '>{description}</p>
                </CardContent>
                <CardFooter className='flex gap-2 items-center'>
                    <p>
                        <Clock className='bg-black text-white rounded-full p-0' />
                    </p>
                    <p>{new Date(dueDate).toLocaleString()}</p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default TaskCard;
