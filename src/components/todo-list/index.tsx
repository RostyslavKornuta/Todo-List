import TodoItem, {Todo, TodoItemEvent} from "./todo-item";
import {Button, Container, FormControl, TextField} from "@mui/material";
import {useState} from "react";

const TodoList = () => {
    const [query, setQuery] = useState('')
    const [todos, setTodos] = useState<Array<Todo>>([{id: 0, title: 'First Todo', isFavorite: false}])

    function onAddClick() {
        if (!query) return

        const newTodo: Todo = {
            id: todos.length,
            title: query,
            isFavorite: false
        };

        setTodos([...todos, newTodo]);
        setQuery('')
    }

    function handleEvent(updatedTodo: Todo, event: TodoItemEvent, value?: string | boolean) {
        switch (event) {
            case "EDIT": {
                setTodos(todos => todos.map(todo => todo === updatedTodo ? { ...todo, title: value as string } : todo))
                break;
            }
            case "FAVORITE": {
                setTodos(todos => todos.map(todo => todo === updatedTodo ? { ...todo, isFavorite: value as boolean } : todo))
                break;
            }
            case "DELETE": {
                setTodos(todos => todos.filter(todo => todo.id !== updatedTodo.id));
                break;
            }
        }
    }

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
                <TextField value={query} onChange={(event => setQuery(event.target.value))}
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
                gap: '16px'}}>
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} onEvent={(event, value?) => handleEvent(todo, event, value)}/>)}
            </Container>
        </Container>
    )
}

export default TodoList;