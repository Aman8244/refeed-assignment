import React from 'react'
import Navbar from '../Navbar';
import Header from '../Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Navbar />
      <div className='my-6'>
        <div className='font-sans text-[2rem] mb-4 font-bold '>
          Tasks
        </div>
        <div>
          <Tabs defaultValue="todo" className="w-[100%]">
            <TabsList>
              <TabsTrigger value="todo">
                <>To do</>
              </TabsTrigger>
              <TabsTrigger value="inprogress">
                <>In process</>
              </TabsTrigger>
              <TabsTrigger value="done">
                <>Done</>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="todo">
              todo.
            </TabsContent>
            <TabsContent value="inprogress">
              in process.
            </TabsContent>
            <TabsContent value="done">
              done.
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  )
}

export default HomePage;