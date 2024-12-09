import { useState } from 'react'
import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'

import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

const TaskInput = (props: TaskInputProps) => {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props

  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <>
      <div className='mb-2'>
        <h1 className={styles.title}>To-do List TypeScript</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter the task...'
            value={currentTodo ? currentTodo.name : name}
            onChange={onChangeInput}
          />
          <button title='Add' type='submit'>
            {currentTodo ? '✔️' : '➕'}
          </button>
        </form>
      </div>
    </>
  )
}

export default TaskInput

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}
