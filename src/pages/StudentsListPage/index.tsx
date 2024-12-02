import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { IStudent } from "src/modules/types.ts";
import StudentCard from "components/StudentCard"; 
import { StudentMocks } from "src/modules/mocks.ts";
import { FormEvent, useEffect } from "react";
import * as React from "react";
import {useDispatch} from "react-redux";
import { useAppSelector } from "src/store/store";
import { updateStudentName } from "src/store/slices/studentsSlices";

type StudentsListPageProps = {
    students: IStudent[];
    setstudents: React.Dispatch<React.SetStateAction<IStudent[]>>;
    isMock: boolean;
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentsListPage = ({ students, setstudents, isMock, setIsMock }: StudentsListPageProps) => {

    const dispatch = useDispatch()

    const {student_name} = useAppSelector((state) => state.students)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateStudentName(e.target.value))
    }



    const fetchData = async () => {
        try {
            const response = await fetch(`/api/students/?student_name=${student_name.toLowerCase()}`, { signal: AbortSignal.timeout(1000) });
            const data = await response.json();
            setstudents(data.students);
            setIsMock(false);
        } catch {
            createMocks();
        }
    };

    const createMocks = () => {
        setIsMock(true);
        setstudents(StudentMocks.filter(student => student.name.toLowerCase().includes(student_name.toLowerCase())));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isMock) {
            createMocks();
        } else {
            await fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={student_name} onChange={handleChange} placeholder="Поиск..." /> {}
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {students?.map(student => (
                    <Col key={student.id} xs="4">
                        <StudentCard student={student} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default StudentsListPage;
