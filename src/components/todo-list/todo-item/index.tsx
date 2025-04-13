import {Box, Container, IconButton, TextField, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";

export type TodoItemEvent = 'EDIT' | 'DELETE' | 'FAVORITE'

export interface Todo {
    id: number
    title: string
    description: string
    isFavorite: boolean
}

const TodoItem = ({todo, onEdit, onFavorite, onDelete}: {
    todo: Todo,
    onEdit: (title: string, description) => void
    onFavorite: (isFavorite: boolean) => void
    onDelete: () => void
}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(todo.title)
    const [newDescription, setNewDescription] = useState(todo.description)

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => setNewTitle(event.target.value)
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => setNewDescription(event.target.value)

    const handleEdit = () => {
        onEdit(newTitle, newDescription)
        toggleEdit()
    }

    const handleFavorite = () => onFavorite(!todo.isFavorite)

    const handleDelete = () => onDelete()

    const toggleEdit = () => setEdit(!edit)

    return (
        <Box sx={{
            padding: '12px 8px',
            border: '1px solid #3C4146',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
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
            </Container>
            <IconButton onClick={edit ? handleEdit : toggleEdit}>
                {edit ? <DoneIcon fontSize="small"/> : <EditOutlinedIcon fontSize="small"/>}
            </IconButton>
            <IconButton onClick={handleFavorite}>
                {todo.isFavorite ? <FavoriteIcon fontSize="small"/> : <FavoriteBorderIcon fontSize="small"/>}
            </IconButton>
            <IconButton onClick={handleDelete}>
                <ClearIcon fontSize="small"/>
            </IconButton>
        </Box>
    )
}

export default TodoItem;