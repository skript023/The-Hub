
export enum ProductGrade {
    development = 'DEVELOPMENT',
    enterprise = 'ENTERPRISE',
    premium = 'PREMIUM',
    basic = 'BASIC',
}

export default interface Product
{
    _id: string;
    code: number;
    name: string;
    price: number;
    grade: ProductGrade;
    game: string;
    target: string;
    file: string;
    version: string;
    status: string;
}