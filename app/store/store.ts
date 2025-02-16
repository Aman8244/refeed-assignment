import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from '@/app/features/tasks/TaskSlice'

export const store = configureStore({
  reducer: {
    tasks:TaskReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch