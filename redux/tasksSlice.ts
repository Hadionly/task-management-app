// src/redux/tasksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../interfaces/Home.types";
import { TaskState, TaskUpdate } from "../interfaces/tasksSlices.types";
import { API_CONFIG } from "../config/api.config";

// Constants
// const IPV4_ADDRESS = "http://192.168.100.9";
const BASE_URL = `${API_CONFIG.IPV4_ADDRESS}:3000`;

// Async thunks
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: { message: string } }
>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addTask = createAsyncThunk<
  Task,
  Omit<Task, "id">,
  { rejectValue: { message: string } }
>("tasks/addTask", async (task, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, task);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateTask = createAsyncThunk<
  Task,
  TaskUpdate,
  { rejectValue: { message: string } }
>("tasks/updateTask", async ({ id, ...updates }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${BASE_URL}/tasks/${id}`, updates);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteTask = createAsyncThunk<
  string,
  string,
  { rejectValue: { message: string } }
>("tasks/deleteTask", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  currentTask: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tasks";
      })

      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add task";
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update task";
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete task";
      });
  },
});

export const { setCurrentTask, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
