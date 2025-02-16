import { ITasks } from '@/types/TaskInterface'
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'


const TaskCard = ({ id, title, description, status }: ITasks) => {
    const router = useRouter();

    return (
        <div>
            <Card onClick={()=>router.push(`/tasks/${id}`)}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        {description}
                    </p>
                </CardContent>
                <CardFooter>
                    <p>
                        {status}
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default TaskCard