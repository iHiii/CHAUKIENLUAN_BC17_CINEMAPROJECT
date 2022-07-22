import { Backdrop, CircularProgress } from "@mui/material"

interface ILoading {
    open: boolean
}

const Loading: React.FC<ILoading> = (props) => {
    const loading: boolean = props.open;
    return (
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}  component={'span'}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}

export default Loading