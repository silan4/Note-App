import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../type";
import { CreateNoteProps } from "./CreateNote";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";


const NoteForm = ({
    onSubmit,
    createTag,
    availableTags,
    title="",
    tags =[],
    markdown ="",
}: CreateNoteProps) => {
    // yerleşik import element
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    /*  
       * FormEvent: Genelde form olayları için kullanılır ve olayın hedefi genellikle
        bir HTML form elementidir.
       * HTMLFormElement: Bu türde bir form elemanının sahip olduğu özelliklere ve metodlara erişim sağlar.
    */

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit({
            // ünlem ile undifend durumunu gözardı ettik
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })
        navigate(-1);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Stack>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control
                                defaultValue={title}
                                ref={titleRef}
                                required
                                className="shadow"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Etiketler</Form.Label>
                            <ReactSelect
                                // daha önce seçilen etiketler 
                                value={selectedTags.map((tag) => ({
                                    label: tag.label,
                                    value: tag.id,
                                }))}
                                // her değişimde olması gereken
                                onChange={(note_tags) => {
                                    setSelectedTags(
                                        note_tags.map((tag) => ({
                                            label: tag.label,
                                            id: tag.value,
                                        }))
                                    );
                                }}
                                onCreateOption={(label) => {
                                    // yeni bir obje tanımlama
                                    const newTag: Tag = { id: v4(), label }
                                    createTag(newTag);
                                    // state'i güncelle
                                    setSelectedTags([...selectedTags, newTag]);
                                }}
                                // daha önceden oluşturduğumuz tagları options kısmında listeledik
                                options={availableTags?.map((item) => ({
                                    label: item.label,
                                    value: item.id,
                                }))}
                                isMulti
                                className="shadow"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown" className="my-4">
                    <Form.Label>İçerik</Form.Label>
                    <Form.Control
                        defaultValue={markdown}
                        ref={markdownRef}
                        as={"textarea"}
                        required
                        className="shadow" />
                </Form.Group>
            </Stack>
            <div className="d-flex justify-content-end gap-2">
                <Button type="submit" >
                    Kaydet
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                >
                    İptal
                </Button>
            </div>
        </Form>
    )
}

export default NoteForm;