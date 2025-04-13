import {TextField} from "@mui/material";
import {useState} from "react";

const TodoInput = ({value, placeholder}: {
    value: string,
    placeholder?: string
}) => {
    const [query, setQuery] = useState(value)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setQuery(newValue)
    }

    return (
        <TextField
            sx={{width: '100%'}}
            placeholder={placeholder || ''}
            value={query}
            onChange={handleChange}
        />
    )
}

export default TodoInput;