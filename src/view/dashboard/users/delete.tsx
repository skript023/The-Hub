import Confirmation from "../../../components/confirmation";

export default function DeleteUser({open, agree, disagree}: { open: boolean; agree: ()=>void; disagree: ()=>void; })
{
    return (
        <>
            <Confirmation title="User Delete" message="Are you sure want to delete this record?" open={open} agree={agree} disagree={disagree}/>
        </>
    )
}
