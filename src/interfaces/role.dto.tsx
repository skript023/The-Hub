export default interface Role
{
    _id: string;
    name: string;
    level: number;
    access: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
        suspend: boolean;
        system: boolean;
    }
}