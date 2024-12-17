import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { IReprimand } from "src/modules/types";
import { ReprimandMocks } from "src/modules/mocks";

const ReprimandsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [reprimands, setReprimands] = useState<IReprimand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/students/${id}/reprimands`, {
                signal: AbortSignal.timeout(2000),
            });
            if (!response.ok) {
                throw new Error("Выговоров нет!");
            }
            const data = await response.json();
            setReprimands(data);
            
        } catch {

        } finally {
            setIsLoading(false);
        }
    };

   

    useEffect(() => {
        fetchData();
    }, [id]);

    if (isLoading) {
        return <Container>Загрузка...</Container>;
    }

    if (error) {
        return <Container>Ошибка: {error}</Container>;
    }

    const getStatusText = (status: number) => {
        if (status === 1) return "Вынесен";
        if (status === 2) return "Аннулирован";
        return "Неизвестный статус";
    };

    return (
        <Container>
            {/* <h1>Выговоры студента</h1> */}
            {reprimands.length === 0 ? (
                <p>У студента пока нет выговоров.</p>
            ) : (
                <ListGroup>
                    {reprimands.map((reprimand) => (
                        <ListGroupItem key={reprimand.id}>
                            <h5>Причина: {reprimand.reason}</h5>
                            <p>Дата: {new Date(reprimand.date_issued).toLocaleDateString()}</p>
                            <p>Статус: {getStatusText(reprimand.status)}</p>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default ReprimandsPage;