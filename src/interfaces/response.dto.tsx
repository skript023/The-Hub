export default interface ServerResponse<T>
{
    message: string;
    data: T;
    success: boolean;
}