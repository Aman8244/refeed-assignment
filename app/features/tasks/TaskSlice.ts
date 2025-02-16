import { ITasks } from '@/types/TaskInterface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ArrayOfTasks {
    tasks: ITasks[];
}

const fetchTasks = async (): Promise<ITasks[]> => {
    const response = await fetch("http://localhost:3000/api/tasks", {
        method: "GET",
    });
    const data = await response.json();
    return data.data
};


const initialState: ArrayOfTasks = {
    tasks: await fetchTasks(),
};

export const counterSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      Add: (state, action: PayloadAction<ITasks>) => {
        state.tasks.push(action.payload);
      },
      DeleteById: (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      },
      UpdateById: (state, action: PayloadAction<ITasks>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      },
    },
  });


export const { Add, DeleteById, UpdateById } = counterSlice.actions

export default counterSlice.reducer