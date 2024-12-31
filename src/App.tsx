import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import { useLocalStorage } from "./useLocalStorage";
import { NoteData, RawNote, Tag } from "./type";
import { v4 } from "uuid";
import MainPage from "./components/MainPage";
import EditNote from "./components/EditNote";
import { useMemo } from "react";
import NoteDetail from "./components/NoteDetail";
import Layout from "./components/Layout";


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // local'den aldığımız notlarda etiket ismi yerine id geliyor
  // bizim yapacağımız id'lerin her birine karşılık gelen etiketleri bulacağız ve objeye ekleyeceğiz
  const noteWithTags = useMemo(() =>
    notes?.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    })),
    [notes, tags]
  );

  // yeni not oluştur
  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          // elemanın etiketlerini dön idlerini diziye aktar
          tagIds: tags?.map((tag) => tag.id),
        },
      ];
    });
  };


  // yeni etiket oluştur
  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  // silme fonksiyonu oluştur
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  // güncelleme fonksiyonu
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />} />
        <Route
          path="/new"
          element={
            <CreateNote
              onSubmit={addNote}
              createTag={createTag}
              availableTags={tags}
            />}
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />} >
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={<EditNote
              onSubmit={updateNote}
              createTag={createTag}
              availableTags={tags}
            />}
          />
        </Route>
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

