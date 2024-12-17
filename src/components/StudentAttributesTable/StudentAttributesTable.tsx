import { useEffect, useState } from "react";
import { Table } from "reactstrap";

const StudentAttributesTable = ({ studentId }) => {
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttributes = async () => {
            setLoading(true);
            setError(null);
            console.log("номер студента", studentId)
            try {
                const response = await fetch(`/api/students/${studentId}/attributes/`); // Используем прокси
                if (!response.ok) {
                    throw new Error("Ошибка загрузки атрибутов");
                }
                const data = await response.json();
                console.log("atrib", data)
                setAttributes(data.attributes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttributes();
    }, [studentId]);

    if (loading) return <p>Загрузка атрибутов...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Атрибут</th>
                    <th>Значение</th>
                </tr>
            </thead>
            <tbody>
                {attributes.map((attr) => (
                    <tr key={attr.id}>
                        <td>{attr.attribute.name}</td>
                        <td>{attr.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default StudentAttributesTable;
