import { useState } from 'react'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
}

const TaskInput = (props: TaskInputProps) => {
  const { addTodo } = props

  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(name)
    setName('')
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
  }

  return (
    <>
      <div className='mb-2'>
        <h1 className={styles.title}>To-do List TypeScript</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter the task...' value={name} onChange={onChangeInput} />
          <button type='submit'>➕</button>
        </form>
      </div>
    </>
  )
}

export default TaskInput
