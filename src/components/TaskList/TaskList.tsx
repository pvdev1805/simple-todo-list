import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'

import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
  currentTodo: Todo | null
}

const TaskList = (props: TaskListProps) => {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo, currentTodo } = props

  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idTodo, event.target.checked)
  }

  return (
    <>
      <div className='mb-2'>
        <h2 className={`${styles.title} ${doneTaskList ? styles.titlePending : styles.titleCompleted}`}>
          {doneTaskList ? 'Completed Task' : 'Pending Task'}
        </h2>

        <div className={styles.tasks}>
          {todos.map((todo) => (
            <div
              className={`${styles.task} ${currentTodo && todo.id === currentTodo.id ? styles.taskEditing : ''}`}
              key={todo.id}
            >
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={todo.done}
                onChange={onChangeCheckbox(todo.id)}
              />
              <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>

              <div className={styles.taskActions}>
                <button title='Edit' className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                  🖋️
                </button>
                <button title='Delete' className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TaskList

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoTypes).isRequired,
  handleDoneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}
