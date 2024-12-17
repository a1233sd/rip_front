import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import { fetchStudent, removeSelectedStudent } from "src/store/slices/studentsSlice";
import ReprimandsPage from "../ReprimandsPage";
import StudentAttributesTable from "../../components/StudentAttributesTable/StudentAttributesTable.tsx"; // Импорт компонента

export const StudentPage = () => {
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();

    const selectedStudent = useAppSelector((state) => state.students.selectedStudent);

    useEffect(() => {
        if (id) {
            dispatch(fetchStudent(id));
        }
        return () => {
            dispatch(removeSelectedStudent());
        };
    }, [dispatch, id]);

    if (!selectedStudent) {
        return (
            <div>
                <h2>Загрузка...</h2>
            </div>
        );
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt="Student"
                        src={selectedStudent.image || "https://via.placeholder.com/150"} // Placeholder для отсутствующих изображений
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedStudent.name}</h1>
                    <p className="fs-5">Курс: {selectedStudent.course}</p>
                    <p className="fs-5">Группа: {selectedStudent.group || "Не указано"}</p>
                    <p className="fs-5">Номер студенческого: {selectedStudent.number || "Не указано"}</p>
                    <h2>Выговоры студента</h2>
                    <ReprimandsPage />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Атрибуты студента</h2>
                    <StudentAttributesTable studentId={id} />
                </Col>
            </Row>
        </Container>
    );
};
