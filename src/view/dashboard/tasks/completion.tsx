import Confirmation from "../../../components/confirmation";

export default function MarkAsCompleted({open, agree, disagree}: { open: boolean; agree: ()=>void; disagree: ()=>void; })
{
    return (
        <>
            <Confirmation title="Mark Task as Completed" message="Are you sure want to mark this task as completed?" open={open} agree={agree} disagree={disagree}/>
        </>
    )
}
