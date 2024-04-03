
export interface Attendance
{
    _id: any;
    user_id: any;
    range: string;
    date: string;
    type: string;
    jenis: string;
    deskripsi: string;
    durasi: string;
    justifikasi_approval: string | null;
    justifikasi_agenda: string | null;
}