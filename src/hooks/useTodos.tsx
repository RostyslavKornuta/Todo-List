import {useEffect, useState} from "react";
import {Todo} from "../components/todo-list/todo-item";

export const useTodos = () => {
    const [todos, setTodos] = useState<Array<Todo> | []>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:5173/api/todos')
            const result = await response.json()
            setTodos(result)
        } catch (error) {
            // @ts-ignore
            setError(error)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { todos, isLoading, error }
}