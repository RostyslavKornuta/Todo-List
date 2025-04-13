import {Box, ButtonGroup, IconButton, TextField, Typography} from "@mui/material";
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
    isFavorite: boolean
}

const TodoItem = ({todo, onEvent}: {
    todo: Todo,
    onEvent: (event: TodoItemEvent, value?: string | boolean) => void
}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(todo.title)

    function handleEdit() {
        if (edit) onEvent('EDIT', newTitle)

        setEdit(!edit)
    }

    return (
        <Box sx={{
            padding: '12px 8px',
            border: '1px solid #3C4146',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
        }}>
            {edit ? <TextField value={newTitle} onChange={event => setNewTitle(event.target.value)}/> :
                <Typography sx={{
                    flex: '1',
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis'
                }}>{todo.title}</Typography>}
            <IconButton onClick={handleEdit}>
                {edit ? <DoneIcon fontSize="small"/> : <EditOutlinedIcon fontSize="small"/>}
            </IconButton>
            <IconButton onClick={() => onEvent('FAVORITE', !todo.isFavorite)}>
                {todo.isFavorite ? <FavoriteIcon fontSize="small"/> : <FavoriteBorderIcon fontSize="small"/>}
            </IconButton>
            <IconButton onClick={() => onEvent('DELETE')}>
                <ClearIcon fontSize="small"/>
            </IconButton>
        </Box>
    )
}

export default TodoItem;