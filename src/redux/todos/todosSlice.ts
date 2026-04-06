import { createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    todoAdded(state, action: { payload: { id: number; text: string } }) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action: { payload: number }) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todoDeleted(state, action: { payload: number }) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { todoAdded, todoToggled, todoDeleted } = todosSlice.actions;
export default todosSlice.reducer;
