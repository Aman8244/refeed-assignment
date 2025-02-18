"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import TaskCard from '../TaskCard';

const HomePage = () => {
  const tasks = useSelector((state: RootState) => state?.tasks?.tasks)
  const dispatch = useDispatch()


  return (
    <div>
      <div className=''>
        <div className='font-sans relative text-[2rem] mb-4 font-bold '>
          <div className='text-center text-[2.5rem]'>
            Tasks
          </div>
        </div>
        <div>
          <Tabs defaultValue="todo" className="relative w-[100%]  ">
            <TabsList className=' my-6 sticky flex items-center justify-center  top-2  '>
              <TabsTrigger className='' value="todo">
                <>To do</>
              </TabsTrigger>
              <TabsTrigger className='' value="inprogress">
                <>In process</>
              </TabsTrigger>
              <TabsTrigger className='' value="done">
                <>Done</>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="todo">
              <div className='grid grid-cols-3 gap-5'>
                {[...tasks].sort(
                  (a, b) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                ).filter((el) => el.status !== "completed").map((el, key) => {
                  return <div className='' key={key}>
                    <TaskCard {...el} index={key} />
                  </div>
                })}
              </div>
            </TabsContent>
            <TabsContent value="inprogress">
              <div className='grid grid-cols-3 gap-5'>
                {[...tasks].sort(
                  (a, b) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                ).filter((el) => el.status === "in-progress").map((el, key) => {
                  return <div className='' key={key}>
                    <TaskCard {...el} index={key} />
                  </div>
                })}
              </div>
            </TabsContent>
            <TabsContent value="done">
              <div className='grid grid-cols-3 gap-5'>
                {[...tasks].sort(
                  (a, b) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                ).filter((el) => el.status === "completed").map((el, key) => {
                  return <div className='' key={key}>
                    <TaskCard {...el} index={key} />
                  </div>
                })}
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  )
}

export default HomePage;