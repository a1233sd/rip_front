import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {IStudent} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {StudentMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type StudentPageProps = {
    selectedStudent: IStudent | null,
    setSelectedStudent: React.Dispatch<React.SetStateAction<IStudent | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentPage = ({selectedStudent, setSelectedStudent, isMock, setIsMock}: StudentPageProps) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/students/${id}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setSelectedStudent(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedStudent(StudentMocks.find(student => student?.id == parseInt(id as string)) as IStudent)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedStudent(null)
    }, []);

    if (!selectedStudent) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedStudent.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedStudent.name}</h1>
                    <p className="fs-5">Номер студенческого: {selectedStudent.group}</p>
                    <p className="fs-5">Курс: {selectedStudent.course}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default StudentPage