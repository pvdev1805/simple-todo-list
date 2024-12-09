import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

// interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')
    setTodos(todoObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }

    const handler = (todosObj: Todo[]) => {
      return [...todosObj, todo]
    }

    setTodos(handler)

    syncReactToLocal(handler)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }

        return todo
      })
    }

    setTodos(handler)

    syncReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)

    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }

        return todo
      })
    }

    setTodos(handler)

    setCurrentTodo(null)

    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }

    const handler = (todosObj: Todo[]) => {
      const findedIndexTodo = todosObj.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...todosObj]
        result.splice(findedIndexTodo, 1)
        return result
      }

      return todosObj
    }

    setTodos(handler)

    syncReactToLocal(handler)
  }

  // console.log(todos)

  return (
    <>
      <div className={styles.todoList}>
        <div className={styles.todoListContainer}>
          <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
          <TaskList
            todos={notDoneTodos}
            handleDoneTodo={handleDoneTodo}
            startEditTodo={startEditTodo}
            deleteTodo={deleteTodo}
            currentTodo={currentTodo}
          />
          <TaskList
            doneTaskList
            todos={doneTodos}
            handleDoneTodo={handleDoneTodo}
            startEditTodo={startEditTodo}
            deleteTodo={deleteTodo}
            currentTodo={currentTodo}
          />
        </div>
      </div>
    </>
  )
}

export default TodoList
