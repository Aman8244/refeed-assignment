"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ITasks } from '@/types/TaskInterface';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-inputs';
import TaskCard from '../components/TaskCard';
import { ChevronLeft, CircleCheck, CircleDot, CircleEllipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const Search = () => {
    const task = useSelector((state: RootState) => state.tasks.tasks);
    const [searchData, setSearchData] = useState<ITasks[]>();
    const [searchInput, setSearchInput] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const placeholders = [
        "Title?",
        "Description?",
    ];
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearchInput(e.target.value);

    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchData(task.filter((el) => {
            return el.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                el.description.toLowerCase().includes(searchInput.toLowerCase())
        }))
    };
    const handleStatusChange = (val: string) => {
        setSearchData(() => task?.filter((el) => el.status === val && (el.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            el.description.toLowerCase().includes(searchInput.toLowerCase()))))
        setTaskStatus(val)
    }

    return (
        <div className='p-4'>
            <div>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
            <div className="my-6 flex gap-4  items-center ">
                <div onClick={() => router.push("/")} className='hover:bg-gray-600 hover:text-black hover:rounded-full hover:p-2 cursor-pointer' >
                    <ChevronLeft />
                </div>
                <div>
                    <Select value={taskStatus} onValueChange={handleStatusChange} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`Status`} />
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
            <div className='grid my-6 grid-cols-3 gap-4'>
                {searchData?.map((el, key) => {
                    return <TaskCard index={key} {...el} key={key} />
                })}
            </div>
        </div>
    )
}

export default Search
