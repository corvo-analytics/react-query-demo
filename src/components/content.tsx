import React, { useState } from "react"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

type Todo = {
  title: string
  id: number
  completed: boolean
}

const fetchTodos = async () => {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(res =>
    res.json()
  )
}

export const Content: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  const { isLoading, error, data }: UseQueryResult = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  })

  const countHandler = () => {
    setCount(count => count + 1)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>{`Error: ${error}`}</span>
  }

  const TodoList = isLoading ? <p>Loading...</p> : <p>{(data as Todo).title}</p>

  return (
    <div className="App">
      <>
        <p>{`Count is: ${count}`}</p>
        <button onClick={countHandler}>Increase count</button>
        {TodoList}
      </>
    </div>
  )
}
