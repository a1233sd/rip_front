import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import mockImage from "assets/mock.png";
import { Link } from "react-router-dom";
import { IStudent } from "modules/types.ts";

interface StudentCardProps {
    student: IStudent,
    isMock: boolean
}

const StudentCard = ({ student, isMock }: StudentCardProps) => {
    const [course, setCourse] = useState<string | null>(null);

    const fetchCourse = async () => {
        try {
            const response = await fetch(`/api/students/${student.id}`, {
                signal: AbortSignal.timeout(1000),
            });
            const data = await response.json();
            setCourse(data.course);
        } catch {
            setCourse("Курс недоступен");
        }
    };

    useEffect(() => {
        if (!isMock) {
            fetchCourse();
        } else {
            setCourse(student.course);
        }
    }, [isMock, student.course]);

    return (
        <Card key={student.id} style={{ width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={isMock ? mockImage as string : student.image}
                style={{ height: "200px" }}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {student.name}
                </CardTitle>
                <CardText>
                    Курс {course || "Загрузка..."}
                </CardText>
                <Link to={`/students/${student.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default StudentCard;
