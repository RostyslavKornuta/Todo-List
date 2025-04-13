import {createTheme} from "@mui/material";

export const theme = createTheme({
    typography: {
        allVariants: {
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
            fontFamily: 'Inter, sans-serif',
        }
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '0 !important'
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '100%',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2B2E31',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2B2E31',
                        borderWidth: '1px'
                    },
                },
                notchedOutline: {
                    borderColor: '#2B2E31',
                },
                input: {
                    color: '#5A6169',
                    padding: '8px',
                },
            },
        },
    },
});