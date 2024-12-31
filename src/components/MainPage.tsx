import { Button, Col, Stack, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "./Form/NoteCard";
import { Note, Tag } from "../type";
import { useState, useMemo } from "react";

type MainProps = {
    notes: Note[];
    availableTags: Tag[];
};

const MainPage = ({ notes, availableTags }: MainProps) => {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");

    const filtredNotes = useMemo(() =>
        notes.filter((note) => {
            return (
                note.title == "" ||
                note.title.toLowerCase().includes(title.toLowerCase()) &&
                (selectedTags.length === 0 ||
                    // every:dizideki bütün elemanlar koşula uyuyor mu
                    // dizideki bir eleman bile şarta uyuyorsa true döndürür
                    (selectedTags.every((tag) =>
                        note.tags.some((noteTag) => tag.id === noteTag.id)
                    )))
            )
        }),
        [title, selectedTags, notes]
    );


    return (
        <div className="container py-5">
            <Stack direction="horizontal" className="justify-content-between">
                <h1>Notlar</h1>
                <Link to={"/new"}>
                    <Button>Oluştur</Button>
                </Link>
            </Stack>
            <Form>
                <Col>
                    <Form.Group>
                        <Form.Label>Başlığa Göre Ara</Form.Label>
                        <Form.Control
                            className="shadow"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Etikete Göre Ara</Form.Label>
                        <ReactSelect
                            onChange={(tags) => {
                                setSelectedTags(
                                    tags.map((tag) => ({
                                        label: tag.label,
                                        id: tag.value,
                                    }))
                                )
                            }}
                            options={availableTags.map((item) => ({
                                label: item.label,
                                value: item.id,
                            }))}
                            isMulti className="shadow" />
                    </Form.Group>
                </Col>
            </Form>
            <Row xs={1} sm={2} lg={4} className="g-3 mt-4">
                {filtredNotes.map((note) => (
                    <Col key={note.id}>
                        <NoteCard note={note} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default MainPage;