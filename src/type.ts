// veri tabanına ya da localstroge a ekleme yaparken hem noteData nın özelliklerini
// ve id'yi ekstradan eklemek istediğimiz için Note type'nı oluşturduk
// ve noteData yı ierisine aktardık

export type Note = {
    id:string;
} & NoteData;

// Form tarafından kullanılacak
export type NoteData = {
    title:string;
    markdown:string;
    tags:Tag[];
};

export type Tag = {
    id: string;
    label: string;
};

export type RawNote = {
    id:string;
} & RawNoteData;

export type RawNoteData = {
    title:string;
    markdown:string;
    tagIds:string[];
}
