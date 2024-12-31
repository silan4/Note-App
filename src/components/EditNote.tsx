import { useOutletContext } from "react-router-dom";
import NoteForm from "./Form/NoteForm";
import { Note ,  NoteData,  Tag  } from "../type";

type EditPropsType ={
    onSubmit: (id:string, data:NoteData) => void;
    createTag: (tag:Tag) => void;
    availableTags:Tag[];
}

const EditNote = ({onSubmit, createTag, availableTags}:EditPropsType) => {
      const props: Note = useOutletContext();
    return(

        <div>
            <h1>Notu Düzenle</h1>
            <NoteForm 
             title={props.title}
             markdown={props.markdown}
             createTag={createTag}
             tags={props.tags}
             availableTags={availableTags}
             onSubmit={(data) => onSubmit(props.id, data)}
            />
        </div>
    )
}

export default EditNote;