import {Box, Container, IconButton, TextField, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";
import {TodoFields} from "../index";
import styled from "styled-components";

export interface Todo {
    id: number
    title: string
    description: string
    isFavorite: boolean
}

const Wrapper = styled(Container)`
    padding: 12px 8px;
    border: 1px solid #3C4146;
    border-radius: 8px;
    display: flex;
    align-items: center
`;

const TodoItem = ({todo, onEdit, onFavorite, onDelete}: {
    todo: Todo,
    onEdit: (id: number, title: string, description: string) => void
    onFavorite: (id: number) => void
    onDelete: (id: number) => void
}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(todo.title)
    const [newDescription, setNewDescription] = useState(todo.description)

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => setNewTitle(event.target.value)
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => setNewDescription(event.target.value)

    const handleEdit = () => {
        onEdit(todo.id, newTitle, newDescription)
        toggleEdit()
    }

    const handleFavorite = () => onFavorite(todo.id)

    const handleDelete = () => onDelete(todo.id)

    const toggleEdit = () => setEdit(!edit)

    return (
        <Wrapper>
            <TodoFields>
                {edit ? <TextField value={newTitle} onChange={handleTitle}/> :
                    <Typography sx={{
                        flex: '1',
                        overflowX: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>{todo.title}</Typography>}
                {edit ? <TextField value={newDescription} onChange={handleDescription}/> :
                    <Typography sx={{
                        flex: '1',
                        overflowX: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>{todo.description}</Typography>}
            </TodoFields>
            <IconButton onClick={edit ? handleEdit : toggleEdit}>
                {edit ? <DoneIcon fontSize="small"/> : <EditOutlinedIcon fontSize="small"/>}
            </IconButton>
            <IconButton onClick={handleFavorite}>
                {todo.isFavorite ? <FavoriteIcon fontSize="small"/> : <FavoriteBorderIcon fontSize="small"/>}
            </IconButton>
            <IconButton onClick={handleDelete}>
                <ClearIcon fontSize="small"/>
            </IconButton>
        </Wrapper>
    )
}

export default TodoItem;