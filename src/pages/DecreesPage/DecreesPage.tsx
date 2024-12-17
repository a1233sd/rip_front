import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import { fetchDecrees, updateFilters, T_DecreesFilters } from "store/slices/decreesSlice";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";
import { useNavigate } from "react-router-dom";
import DecreesTable from "src/components/DecreesTable";

export const DecreesPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const decrees = useAppSelector((state) => state.decrees.decrees);
    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);
    const filters = useAppSelector((state) => state.decrees.filters);

    const [status, setStatus] = useState(filters.status);
    const [dateStart, setDateStart] = useState(filters.date_formation_start);
    const [dateEnd, setDateEnd] = useState(filters.date_formation_end);

    const statusOptions = {
        0: "Любой",
        1: "Черновик",
        2: "В работе",
        3: "Завершен",
        4: "Отклонен",
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/403/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(fetchDecrees());
    }, [dispatch]);

    const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newFilters: T_DecreesFilters = {
            status,
            date_formation_start: dateStart,
            date_formation_end: dateEnd,
        };
        await dispatch(updateFilters(newFilters));
        await dispatch(fetchDecrees());
    };

    return (
        <Container>
            <Form onSubmit={applyFilters}>
                <Row className="mb-4 align-items-center">
                    <Col md="3">
                        <label>От</label>
                        <Input
                            type="date"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md="3">
                        <label>До</label>
                        <Input
                            type="date"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md="4">
                        <CustomDropdown
                            label="Статус"
                            selectedItem={status}
                            setSelectedItem={setStatus}
                            options={statusOptions}
                        />
                    </Col>
                    <Col>
                        <Button color="primary" type="submit">
                            Применить
                        </Button>
                    </Col>
                </Row>
            </Form>
            {decrees.length > 0 ? (
                <div> 
                     <DecreesTable decrees={decrees} /> 
                </div>
            ) : (
                <h3 className="text-center mt-5">Декреты не найдены</h3>
            )}
        </Container>
    );
};
