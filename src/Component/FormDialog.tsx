import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";

type ModalProps = {
  openModal: boolean;
  Login(userName: string, password: string): void;
  resister?: boolean;
};
export const FormDialog: React.FC<ModalProps> = (props) => {
  const { openModal, Login, resister} = props;
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      Login(userName, password)
    }
  };

  useEffect(() => {
    setUserName("");
    setPassword("");
  }, [openModal]);

  return (
    <div>
      <Dialog open={openModal} fullWidth maxWidth="sm">
        <DialogTitle>Đăng nhập</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="Tên đăng nhập"
            fullWidth
            variant="standard"
            value={userName}
            onKeyDown={keyDownHandler}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pw"
            label="Mật khẩu"
            fullWidth
            variant="standard"
            type="password"
            value={password}
            onKeyDown={keyDownHandler}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => Login(userName, password)}
          color='primary' variant="contained">Đăng nhập</Button>
          {resister ? <Button color='green' variant="contained">Đăng ký</Button> : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};
