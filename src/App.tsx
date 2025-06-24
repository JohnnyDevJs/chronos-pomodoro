import './styles/global.scss'
import './styles/theme.scss'

import { MessagesContainer } from './components/MessagesContainer'
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'
import { MainRouter } from './routers/MainRouter'

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  )
}
