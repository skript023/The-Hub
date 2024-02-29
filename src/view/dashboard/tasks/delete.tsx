import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function DeleteTask({agree, disagree}: any)
{
    return (
        <>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure want to delete this data?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={disagree}>Disagree</Button>
            <Button onClick={agree} autoFocus>
                Agree
            </Button>
        </DialogActions>
        </>
    )
}
