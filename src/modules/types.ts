// src/modules/types.ts

export interface IStudent {
    id: number;
    name: string;
    course: string;
    status: number;
    image: string;
    group: string;
    number: string;
}

export interface IReprimand {
    id: number;
    reason: string;
    date_issued: string;
    status: number; // Числовое значение статуса.
    issued_by: string;
}