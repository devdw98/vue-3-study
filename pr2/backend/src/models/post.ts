export interface IPost {
    title: string;
    content: string;
    _writer?: string;
    createdAt: Date;
    updatedAt: Date;
}