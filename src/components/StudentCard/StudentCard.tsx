import { Button, Card, CardBody, CardTitle, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import { addStudentToDecree, fetchStudents } from "src/store/slices/studentsSlice";
import { T_Student } from "utils/types.ts";
import { removeStudentFromDraftDecree, updateStudentValue } from "src/store/slices/decreesSlice";
import CustomInput from "components/CustomInput";
import { useEffect, useState } from "react";

type Props = {
    student: T_Student;
    showAddBtn?: boolean;
    showRemoveBtn?: boolean;
    showMM?: boolean;
    editMM?: boolean;
};

export const StudentCard = ({
    student,
    showAddBtn = false,
    showRemoveBtn = false,
    showMM = false,
    editMM = false,
}: Props) => {
    const dispatch = useAppDispatch();

    const [localValue, setLocalValue] = useState(student.value?.toString() || "");
    const [local_comment, setLocal_comment] = useState(student.group || "");

    const handleAddToDraftDecree = async () => {
        await dispatch(addStudentToDecree(student.id));
        await dispatch(fetchStudents());
    };

    const handleRemoveFromDraftDecree = async () => {
        await dispatch(removeStudentFromDraftDecree(student.id));
    };

    useEffect(() => {
        if (editMM) {
            dispatch(
                updateStudentValue({
                    student_id: student.id,
                    value: Number(localValue),
                })
            );
        }
    }, [localValue]);

    return (
        <Card key={student.id} style={{ width: "18rem" }}>
            <img
                alt="Student"
                src={student.image || "https://via.placeholder.com/150"}
                style={{ height: "200px" }}
            />
            <CardBody>
                <CardTitle tag="h5">{student.name}</CardTitle>
                {showMM && (
                    <>
                        <CustomInput
                            label="Количество долгов"
                            value={localValue}
                            setValue={setLocalValue}
                            disabled={!editMM}
                            type="number"
                        />
                        <CustomInput
                            label="Группа"
                            type="text"
                            value={local_comment}
                            setValue={setLocal_comment}
                            disabled={true}
                        />
                    </>
                )}
                <Col className="d-flex justify-content-between">
                    <Link to={`/students/${student.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn && (
                        <Button color="secondary" onClick={handleAddToDraftDecree}>
                            Добавить
                        </Button>
                    )}
                    {showRemoveBtn && (
                        <Button color="danger" onClick={handleRemoveFromDraftDecree}>
                            Удалить
                        </Button>
                    )}
                </Col>
            </CardBody>
        </Card>
    );
};
