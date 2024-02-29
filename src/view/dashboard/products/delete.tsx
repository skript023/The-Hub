import Confirmation from "../../../components/confirmation";

export default function DeleteProduct({open, agree, disagree}: { open: boolean; agree: ()=>void; disagree: ()=>void; })
{
    return (
        <>
            <Confirmation title="Product Delete" message="Are you sure want to delete this record?" open={open} agree={agree} disagree={disagree}/>
        </>
    )
}
