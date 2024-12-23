import { styled, Button, TextField } from "@mui/material";

const mainColor = '#13ba00'
const main2Color = '#0e5421'

export const BasicButton = styled(Button)({
    '&.MuiButton-root': {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #D1D5DC',
        boxShadow: '1px 1px 1px 0px #00000040',
        backgroundColor: '#ffffff',
        color: '#050315'
    },
    '&.Mui-disabled': {
        backgroundColor: '#D1D5DC',
        color: 'white',
    },
    '&:hover': {
        backgroundColor: '#D1D5DC'
    },
});

export const MainButton = styled(Button)({
    '&.MuiButton-root': {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #D1D5DC',
        boxShadow: '1px 1px 1px 0px #00000040',
        backgroundColor: mainColor,
        color: '#ffffff'
    },
    '&:hover': {
        backgroundColor: main2Color
    },
});


export const NavigateButton = styled(Button)({
    '&.MuiButton-root': {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #000',
        boxShadow: '1px 1px 1px 0px #00000040',
        color: '#050315'
    },
    '&.Mui-disabled': {
        backgroundColor: '#D1D5DC',
        color: 'white',
    },
    '&:hover': {
        backgroundColor: '#D1D5DC'
    },
});

export const StyledTextField = styled(TextField)({
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    '& .MuiFilledInput-root.Mui-focused': {
        boxShadow: 'none',
        border: `1px solid ${mainColor}`
    },
    '& .MuiFilledInput-input': {
        padding: '0 10px',
        height: '34px',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },
    '& .MuiFilledInput-root': {
        padding: '5px',
        minHeight: '34px',
    },
});