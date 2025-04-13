import TodoItem, {Todo, TodoItemEvent} from "./todo-item";
import {Button, Container, FormControl, TextField} from "@mui/material";
import {useState} from "react";

const TodoList = () => {
    const [query, setQuery] = useState('')
    const [todos, setTodos] = useState<Array<Todo>>([{id: 0, title: 'First Todo', isFavorite: false}])

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)

    const onAddClick = () => {
        if (!query) return

        const newTodo: Todo = {
            id: todos.length,
            title: query,
            isFavorite: false
        };

        setTodos([...todos, newTodo]);
        setQuery('')
    }

    const onEdit = (updatedTodo, value) => setTodos(todos => todos.map(todo => todo === updatedTodo ? {
        ...todo,
        title: value
    } : todo))

    const onFavorite = (updatedTodo, isFavorite) => setTodos(todos => todos.map(todo => todo === updatedTodo ? {
        ...todo,
        isFavorite
    } : todo))

    const onDelete = (updatedTodo) => setTodos(todos => todos.filter(todo => todo.id !== updatedTodo.id))

    return (
        <Container sx={{
            height: 'calc(100vh - 400px)',
            width: '600px',
            margin: '200px auto',
            padding: '16px !important',
            border: '1px solid #3C4146',
            borderRadius: '8px'
        }}>
            <FormControl sx={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                <TextField value={query} onChange={handleTitle}
                           placeholder="Write there a new future task"/>
                <Button onClick={onAddClick}>Add</Button>
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
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} onEdit={value => onEdit(todo, value)}
                                             onFavorite={isFavorite => onFavorite(todo, isFavorite)}
                                             onDelete={() => onDelete(todo)}/>)}
            </Container>
        </Container>
    )
}

export default TodoList;