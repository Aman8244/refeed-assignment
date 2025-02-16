import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from '@/app/features/tasks/TaskSlice'

export const store = configureStore({
  reducer: {
    tasks: TaskReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["tasks/UpdateById"],
        ignoredActionPaths: ["meta.arg", "payload.dueDate"],
        ignoredPaths: ["tasks.tasks.3.dueDate"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch