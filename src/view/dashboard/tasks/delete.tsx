import Confirmation from "../../../components/confirmation";

export default function DeleteTask({open, agree, disagree}: { open: boolean; agree: ()=>void; disagree: ()=>void; })
{
    return (
        <>
            <Confirmation title="Task Delete" message="Are you sure want to delete this record?" open={open} agree={agree} disagree={disagree}/>
        </>
    )
}
