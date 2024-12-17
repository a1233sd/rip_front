import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Student, T_StudentsListResponse } from "src/utils/types";
import { api } from "modules/api";
import { AxiosResponse } from "axios";
import { RootState } from "store/store";

type T_StudentsSlice = {
  student_name: string;
  selectedStudent: T_Student | null;
  students: T_Student[];
  draft_decree_id: number | null; // Добавлено поле для хранения draft_decree_id
  students_count: number; // Добавлено поле для хранения students_count
};

const initialState: T_StudentsSlice = {
  student_name: "",
  selectedStudent: null,
  students: [],
  draft_decree_id: null, // Инициализируем поле как null
  students_count: 0, // Инициализируем счётчик студентов
};

// Асинхронный thunk для получения конкретного студента
export const fetchStudent = createAsyncThunk<T_Student, string>(
  "students/fetchStudent",
  async function (id) {
    const response = (await api.students.studentsRead(id)) as AxiosResponse<T_Student>;
    return response.data;
  }
);

// Асинхронный thunk для получения списка студентов
export const fetchStudents = createAsyncThunk<T_StudentsListResponse, void, { state: RootState }>(
  "students/fetchStudents",
  async function (_, thunkAPI) {
    const state = thunkAPI.getState(); // Типизированный доступ к состоянию
    const response = (await api.students.studentsList({
      student_name: state.students.student_name,
    })) as AxiosResponse<T_StudentsListResponse>;
    return response.data;
  }
);

export const addStudentToDecree = createAsyncThunk<void, string>(
  "students/addStudentToDecree",
  async function (student_id, thunkAPI) {
    try {
      await api.students.studentsAddToDecreeCreate(student_id);
    } catch (error) {
      console.error("Ошибка:", error);
      return thunkAPI.rejectWithValue("Не удалось добавить студента");
    }
  }
);

// Создание Redux slice
const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<string>) => {
      state.student_name = action.payload; // Обновление строки поиска
    },
    removeSelectedStudent: (state) => {
      state.selectedStudent = null; // Очистка выбранного студента
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action: PayloadAction<T_StudentsListResponse>) => {
      state.students = action.payload.students; // Заполнение списка студентов
      state.draft_decree_id = action.payload.draft_decree_id; // Сохранение draft_decree_id
      state.students_count = action.payload.students_count; // Сохранение students_count
    });
    builder.addCase(fetchStudent.fulfilled, (state, action: PayloadAction<T_Student>) => {
      state.selectedStudent = action.payload; // Заполнение выбранного студента
    });
  },
});

// Экспортируем actions и reducer
export const { updateQuery, removeSelectedStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
