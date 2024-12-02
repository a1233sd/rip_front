import {createSlice} from "@reduxjs/toolkit";

type T_StudentsSlice = {
    student_name: string
}

const initialState:T_StudentsSlice = {
    student_name: "",
}


const studentsSlice = createSlice({
    name: 'students',
    initialState: initialState,
    reducers: {
        updateStudentName: (state, action) => {
            state.student_name = action.payload
        }
    }
})

export const { updateStudentName} = studentsSlice.actions;

export default studentsSlice.reducer