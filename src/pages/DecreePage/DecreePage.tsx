import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import {
    deleteDraftDecree,
    fetchDecree,
    removeDecree,
    sendDraftDecree,
    triggerUpdateMM,
    updateDecree,
} from "store/slices/decreesSlice.ts";
import StudentCard from "components/StudentCard"; 
import { Button, Col, Form, Row } from "reactstrap";
import { E_DecreeStatus, T_Student } from "src/utils/types.ts";
import CustomInput from "components/CustomInput";
import CustomDatePicker from "components/CustomDatePicker";

export const DecreePage = () => {
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);
    const decree = useAppSelector((state) => state.decrees.decree);

    const [date, setDate] = useState<string>(decree?.date_formation || "");
    const [number, setNumber] = useState<string>(decree?.number || "");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/403/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(fetchDecree(id!));
        return () => dispatch(removeDecree());
    }, [dispatch, id]);

    useEffect(() => {
        if (decree) {
            setDate(decree.date || "");
            console.log("number ",decree.number )
            setNumber(decree.number || "");
        }
       
        console.log("decree num", decree?.number);
    }, [decree]);

    const sendDecree = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            date,
            number,
        };
        console.log("sendDecree")
        await dispatch(updateDecree(data));
        await dispatch(sendDraftDecree());
        navigate("/decrees");
    };

    const saveDecree = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const data = {
            date,
            number,
        };

        await dispatch(updateDecree(data));
        await dispatch(triggerUpdateMM());
    };

    const deleteDecree = async () => {
        try {
            await dispatch(deleteDraftDecree()).unwrap(); // unwrap позволяет выкинуть ошибку, если она есть
            navigate("/students");
        } catch (error) {
            console.error("Failed to delete the decree:", error);
            // Вы можете добавить уведомление для пользователя
        }
    };

    if (!decree) {
        return <div>Загрузка...</div>;
    }

    const isDraft = decree.status === E_DecreeStatus.Draft;

    return (
        <Form onSubmit={sendDecree} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой декрет" : `Декрет №${id}`}</h2>
            <Row className="mb-5 fs-5 w-50">
                { <CustomDatePicker
                    label="Дата подачи заявления"
                    value={date}
                    setValue={setDate}
                    disabled={!isDraft}
                /> }
            </Row>
            <Row>
    {decree.students && decree.students.length > 0 ? (
        decree.students.map((student: T_Student) => (
            <Col md="4" key={student.id} className="d-flex justify-content-center mb-5">
                <StudentCard
                    student={student}
                    showRemoveBtn={isDraft}
                    showMM={true}
                    editMM={isDraft}
                />
            </Col>
        ))
    ) : (
        <h3 className="text-center">Студенты еще не добавлены</h3>
    )}
</Row>
            {isDraft && (
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                    <Button color="success" className="fs-4" onClick={saveDecree}>
                        Сохранить
                    </Button>
                        <Button color="success" className="fs-4" >
                            Отправить
                        </Button>
                        <Button color="danger" className="fs-4" onClick={deleteDecree}>
                            Удалить
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
};
