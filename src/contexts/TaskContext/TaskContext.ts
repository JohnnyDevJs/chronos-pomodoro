import { createContext, type Dispatch } from 'react'

import type { TaskStateModel } from '@/models/TaskStateModel'

import { initialTaskState } from './initialTaskState'
import type { TaskActionModel } from './taskActions'

export type TaskContextProps = {
  state: TaskStateModel
  dispatch: Dispatch<TaskActionModel>
}

export const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
}

export const TaskContext = createContext<TaskContextProps>(initialContextValue)
