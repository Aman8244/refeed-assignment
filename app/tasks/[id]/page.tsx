"use client"
import { RootState } from '@/app/store/store'
import { ITasks } from '@/types/TaskInterface'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Edit, CalendarIcon, CircleDot, CircleEllipsis, CircleCheck, ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UpdateById } from '@/app/features/tasks/TaskSlice'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const TaskDetails = () => {
  const tasks = useSelector((state: RootState) => state?.tasks?.tasks);
  const params = useParams();
  const id = params.id;
  const [currentTask, setTask] = useState<ITasks | null>(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "", status: "", dueDate: new Date() });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const task = tasks.find((el) => el.id === id);
    if (task) {
      setTask(task);
      setEditedTask({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      });
    }
  }, [tasks, id]);

  const handleChange = (field: keyof ITasks, value: string | Date | undefined) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedTask),
    });

    if (response.ok) {
      setIsEditing(false);
      dispatch(UpdateById({ ...editedTask, id: id }))
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg w-full max-w-[900px] mx-auto">
      <div>

      </div>
      {currentTask && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div onClick={() => router.push("/")} className='hover:bg-gray-600 hover:rounded-full hover:p-2 cursor-pointer' >
              <ChevronLeft />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="text-3xl font-bold capitalize border p-2 rounded-md w-full"
              />
            ) : (
              <h1 className="text-3xl font-bold capitalize truncate " onClick={() => setIsEditing(true)} >{currentTask.title}</h1>
            )}

            {/* <Edit
              className="cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setIsEditing(!isEditing)}
            /> */}
          </div>

          <div className="mb-4">
            {isEditing ? (
              <Textarea
                value={editedTask.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full border p-2 rounded-md"
                rows={10}
              />
            ) : (
              <p className="text-gray-700" onClick={() => setIsEditing(true)} >{currentTask.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Select value={editedTask.status} onValueChange={(val) => handleChange("status", val)} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`${editedTask.status}`} />
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

          <div className="flex items-center gap-4 mb-4">
            <Popover>
              <PopoverTrigger>
                <div className='flex gap-4 items-center border border-gray-300 rounded-lg p-2 text-[14px]'>
                  {!editedTask.dueDate ? <span>Pick a date</span> : editedTask?.dueDate.toLocaleString()} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className='border-0 p-0 flex items-center justify-center'>
                <Calendar required mode="single" selected={editedTask.dueDate}
                  onSelect={(date) => handleChange("dueDate", date)}
                  className="rounded-md border-0" disabled={(day) => day.getTime() < new Date().setHours(0, 0, 0, 0)} />
              </PopoverContent>
            </Popover>
          </div>


          <Button
            className=" text-white px-4 py-2 rounded-md"
            onClick={handleUpdate}
            disabled={!isEditing && editedTask.title === currentTask.title && editedTask.description === currentTask.description && editedTask.status === currentTask.status && editedTask.dueDate === currentTask.dueDate}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;

