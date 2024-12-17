import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import StudentCard from "components/StudentCard";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import { fetchStudents, updateQuery } from "src/store/slices/studentsSlice.ts";
import { Bin } from "../../components/Bin/Bin.tsx";


export const StudentsListPage = () => {
    const dispatch = useAppDispatch();

    // Список студентов
    const students = useAppSelector((state) => state.students.students);

    // Авторизация пользователя
    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);

    // Черновик декрета из studentsSlice
    const draftDecreeId = useAppSelector((state) => state.students.draft_decree_id);
    const studentsCount = useAppSelector((state) => state.students.students_count);
    
    const hasDraft = draftDecreeId != null;

    // Поисковый запрос
    const student_name = useAppSelector((state) => state.students.student_name);

    // Локальное состояние для хранения draftDecreeId
    const [localDraftDecreeId, setLocalDraftDecreeId] = useState<number | null>(null);



    // Обработчик изменения строки поиска
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuery(e.target.value));
    };

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchStudents());
    };

    // Запрос данных студентов при загрузке страницы
    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    // Отслеживание изменений draftDecreeId
    useEffect(() => {
        setLocalDraftDecreeId(draftDecreeId);
    }, [draftDecreeId]);

    useEffect(() => {
        console.log(studentsCount)
    }, [localDraftDecreeId, draftDecreeId]);

    return (
        <Container>
            <Row>
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input
                                    value={student_name}
                                    onChange={handleChange}
                                    placeholder="Поиск студентов..."
                                ></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md="6">
                    <Row>
                        <Col>
                            {isAuthenticated && (
                                <Bin
                                    isActive={hasDraft}
                                    draft_decree_id={localDraftDecreeId}
                                    students_count={studentsCount}
                                />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {students?.map((student) => (
                    <Col key={student.id} xs="4" className="mb-5 d-flex justify-content-center">
                        <StudentCard student={student} showAddBtn={isAuthenticated} showMM={false} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
