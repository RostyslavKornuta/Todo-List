import React from "react";
import {useTodos} from "./hooks/useTodos";
import {CircularProgress, Container, Typography} from "@mui/material";
import TodoList from "./components/todo-list";
import styled from "styled-components";

const Wrapper = styled(Container)`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Error = styled(Typography)`
    font-size: 24px !important;
    font-weight: 500 !important;
    line-height: 32px !important;
    color: red;
`;

function App() {
    const { todos, isLoading, error } = useTodos()

    return (
        <Wrapper>
            {isLoading && <CircularProgress />}
            {!isLoading && error && <Error>Oops, something went wrong...</Error>}
            {!isLoading && !error && <TodoList fetchedTodos={todos}/>}
        </Wrapper>
    )
}

export default App
