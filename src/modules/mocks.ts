// src/modules/mocks.ts
import { IStudent, IReprimand } from "src/modules/types";

export const StudentMocks: IStudent[] = [
    {
        id: 1,
        name: "Хомякова Дарья Артёмовна",
        course: "2",
        status: 1,
        image: "",
        group: "ИУ1-31Б",
        number: "23У023",
    },
    {
        id: 2,
        name: "Грибова Малика Максимовна",
        course: "3",
        status: 1,
        image: "",
        group: "РК2-51Б",
        number: "22Р034",
    },
    {
        id: 3,
        name: "Любимов Матвей Степанович",
        course: "1",
        status: 1,
        image: "",
        group: "Э6-11Б",
        number: "24Э143",
    },
    {
        id: 4,
        name: "Зубков Андрей Иванович",
        course: "3",
        status: 1,
        image: "",
        group: "ИУ5Ц-71Б",
        number: "21Ц010",
    }
];

export const ReprimandMocks: IReprimand[] = [
    {
        id: 1,
        reason: "Прогул занятий",
        date_issued: "2023-01-15",
        status: 1,
        issued_by: "Преподаватель Иванов",
    },
    {
        id: 2,
        reason: "Нарушение дисциплины",
        date_issued: "2023-02-20",
        status: 2,
        issued_by: "Преподаватель Петров",
    },
    {
        id: 3,
        reason: "Несвоевременная сдача работы",
        date_issued: "2023-03-10",
        status: 1,
        issued_by: "Преподаватель Сидоров",
    },
];