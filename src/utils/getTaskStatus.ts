import type { TaskModel } from '@/models/TaskModel'

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completeDate) return { name: 'complete', label: 'Completa' }
  if (task.interruptDate) return { name: 'interrupt', label: 'Interrompida' }
  if (task.id === activeTask?.id)
    return { name: 'inProgress', label: 'Em progresso' }

  return { name: 'abandoned', label: 'Abandonada' }
}
