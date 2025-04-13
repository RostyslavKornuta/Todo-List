import TodoItem, {Todo} from "./todo-item";
import {Button, Container, FormControl, TextField} from "@mui/material";
import {useState} from "react";
import * as yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type TodoFields = {
    title: string,
    description?: string
}

const TodoList = () => {
    const schema: yup.ObjectSchema<TodoFields> = yup.object().shape({
        title: yup.string().trim().required('This field is required'),
        description: yup.string().trim()
    })
    const [todos, setTodos] = useState<Array<Todo>>([{
        id: 0,
        title: 'First Todo',
        description: 'Test Description',
        isFavorite: false
    }])
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<TodoFields>({
        resolver: yupResolver(schema)
    })

    const onAddClick = (data: TodoFields) => {

        const newTodo: Todo = {
            id: todos.length,
            title: data.title,
            description: data.description,
            isFavorite: false
        };

        setTodos([...todos, newTodo]);
        reset()
    }

    const onEdit = (updatedTodo: Todo, title: string, description: string) => setTodos(todos => todos.map(todo => todo === updatedTodo ? {
        ...todo,
        title: title,
        description: description
    } : todo))

    const onFavorite = (updatedTodo: Todo, isFavorite: boolean) => setTodos(todos => todos.map(todo => todo === updatedTodo ? {
        ...todo,
        isFavorite
    } : todo))

    const onDelete = (updatedTodo: Todo) => setTodos(todos => todos.filter(todo => todo.id !== updatedTodo.id))

    return (
        <Container sx={{
            height: 'calc(100vh - 400px)',
            width: '600px',
            margin: '200px auto',
            padding: '16px !important',
            border: '1px solid #3C4146',
            borderRadius: '8px'
        }}>
            <FormControl onSubmit={handleSubmit(onAddClick)} sx={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <TextField error={!!errors.title?.message} helperText={errors.title?.message} {...register('title')} placeholder="Write there a new future task"/>
                    <TextField {...register('description')} placeholder="Write there a description for new future task"/>
                </Container>
                <Button onClick={handleSubmit(onAddClick)} type='submit'>Add</Button>
            </FormControl>
            <Container sx={{
                height: 'calc(100% - 56px)',
                marginTop: '16px',
                padding: '0 4px 0 0 !important',
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} onEdit={(title, description) => onEdit(todo, title, description)}
                                             onFavorite={isFavorite => onFavorite(todo, isFavorite)}
                                             onDelete={() => onDelete(todo)}/>)}
            </Container>
        </Container>
    )
}

export default TodoList;