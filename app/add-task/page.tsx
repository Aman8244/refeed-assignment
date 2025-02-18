"use client"
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { CalendarIcon, ChevronLeft, CircleCheck, CircleDot, CircleEllipsis } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch } from 'react-redux';
import { Add } from '../features/tasks/TaskSlice';

const AddTask = () => {
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>();
    const [status, setStatus] = useState<string | undefined>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    dueDate: date,
                })
            });
            const data = await response.json();

            dispatch(Add({
                id: data?.data?.id,
                title,
                description,
                status: `${status}`,
                dueDate: date || new Date(),
            }))
            router.push('/');
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <div>
                <form onSubmit={handleSubmit} className='max-w-[90%] mx-[5%] mb-[3%]'>
                    <div className='text-gray-600 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer'>
                        <div className='flex gap-4 items-center'>
                            <div onClick={() => router.push("/")} className='hover:bg-gray-600 hover:text-black hover:rounded-full hover:p-2 cursor-pointer' >
                                <ChevronLeft />
                            </div>
                            <div onClick={() => router.push("/")} className='text-[18px]'> Add new task </div>
                        </div>
                        <div>
                            <Select value={status} onValueChange={setStatus} required>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending" className='text-red-500 font-semibold'>
                                        <div className='flex flex-row gap-2 items-center'> <CircleDot /> Pending </div>
                                    </SelectItem>
                                    <SelectItem value="in-progress" className='text-yellow-500 font-semibold'>
                                        <div className='flex flex-row gap-2 items-center'> <CircleEllipsis /> In Process </div>
                                    </SelectItem>
                                    <SelectItem value="completed" className='text-green-500 font-semibold'>
                                        <div className='flex flex-row gap-2 items-center'> <CircleCheck /> Completed </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Input required className="focus:border-b-2 my-6" placeholder="Task name" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <div>Due date</div>
                        <div className='my-4'>
                            <Popover>
                                <PopoverTrigger>
                                    <div className='flex gap-4 items-center border border-gray-300 rounded-lg p-2 text-[14px]'>
                                        {!date ? <span>Pick a date</span> : date.toDateString()} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='border-0 p-0 flex items-center justify-center'>
                                    <Calendar required mode="single" selected={date} onSelect={setDate} className="rounded-md border-0" disabled={(day) => day.getTime() < new Date().setHours(0, 0, 0, 0)} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <div>Description</div>
                        <Textarea required className="focus:border-b-4 my-6" rows={10} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <Button type='submit' className='w-full py-2 text-[18px] bg-gray-600' disabled={loading}>
                            {loading ? 'Adding...' : 'Add task'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask