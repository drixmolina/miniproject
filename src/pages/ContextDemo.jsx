import { TodoProvider } from '../context/TodoContext'
import TodoAppWithContext from '../TodoAppContext'

export default function ContextDemo() {
  return (
    <TodoProvider>
      <TodoAppWithContext />
    </TodoProvider>
  )
}
