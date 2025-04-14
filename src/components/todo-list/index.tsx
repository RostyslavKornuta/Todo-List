import TodoItem, {Todo} from "./todo-item";
import {Button, Container, FormControl, TextField} from "@mui/material";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

type TodoForm = Pick<Todo, 'title' | 'description'>;

const schema = yup.object().shape({
    title: yup.string().trim().required('This field is required'),
    description: yup.string().trim()
})

const Wrapper = styled(Container)`
    height: calc(100vh - 400px);
    width: 600px !important;
    margin: 200px auto;
    padding: 16px;
    border: 1px solid #3C4146;
    border-radius: 8px
`;

const Todos = styled(Container)`
  height: calc(100% - 102px);
  margin-top: 16px;
  padding-right: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TodoFields = styled(Container)`
    display: flex;
    flex-direction: column;
    gap: 8px
`;

const TodoForm = styled(FormControl)`
    display: flex !important;
    flex-direction: row !important;
    gap: 8px
`;

const TodoList = ({ fetchedTodos }: { fetchedTodos: Array<Todo> }) => {
    const [todos, setTodos] = useState<Array<Todo>>(fetchedTodos || [])
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<TodoForm>({
        resolver: yupResolver(schema)
    })

    const onAddClick = (data: Todo) => {
        const newTodo: Todo = {
            id: todos.length,
            title: data.title,
            description: data.description,
            isFavorite: false
        };

        setTodos([...todos, newTodo]);
        reset()
    }

    const onEdit = (id: number, title: string, description: string) => setTodos(todos => todos.map(todo => todo.id === id ? {
        ...todo,
        title: title,
        description: description
    } : todo))

    const onFavorite = (id: number) => setTodos(todos => todos.map(todo => todo.id === id ? {
        ...todo,
        isFavorite: !todo.isFavorite
    } : todo))

    const onDelete = (id: number) => setTodos(todos => todos.filter(todo => todo.id !== id))

    return (
        <Wrapper>
            <TodoForm onSubmit={handleSubmit(onAddClick)}>
                <TodoFields>
                    <TextField error={!!errors.title?.message} helperText={errors.title?.message} {...register('title')}
                               placeholder="Write there a new future task"/>
                    <TextField {...register('description')}
                               placeholder="Write there a description for new future task"/>
                </TodoFields>
                <Button onClick={handleSubmit(onAddClick)} type='submit'>Add</Button>
            </TodoForm>
            <Todos>
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} onEdit={onEdit}
                                             onFavorite={onFavorite}
                                             onDelete={onDelete}/>)}
            </Todos>
        </Wrapper>
    )
}

export default TodoList;