import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../../type";


export type CreateNoteProps = {
    onSubmit: (data: NoteData) => void;
    createTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData>;

/* 
partial sayesinde şunu yapmış olduk ;
farklı bir type in bütün değerlerini 
bu createNoteProps type'ına aktardık
aynı zamanda partials kullanıldığı için hepsi ? ile tanımlanmış gibi bazı durumlarda 
undefined olabilir.
*/

const CreateNote = ({
    onSubmit,
    createTag,
    availableTags,
}: CreateNoteProps) => {
    return (
        <div className="container py-4">
            <h2>Yeni Not Oluştur</h2>
            <NoteForm
                onSubmit={onSubmit}
                createTag={createTag}
                availableTags={availableTags}
            />
        </div>
    );
};

export default CreateNote;