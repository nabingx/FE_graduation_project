import { Backdrop, CircularProgress } from "@mui/material";


export default function LoadingScreen(props: any) {
    const {
        loading,
    } = props;
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: 2600,
            }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}