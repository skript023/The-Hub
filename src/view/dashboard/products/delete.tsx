import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import Product from "../../../interfaces/product.dto";

export default function DeleteProduct({agree, disagree, product}: { agree: any, disagree: any, product: Product })
{
    return (
        <>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure want to delete { product.name } product data?
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
