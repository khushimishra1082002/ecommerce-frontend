import { createSlice, createAsyncThunk ,PayloadAction } from "@reduxjs/toolkit";
import { getMyProfile, updateMyProfile } from "../../services/profileService";
import {UserDTO} from "../../types/user"

interface ProfileState {
  user: UserDTO | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk<
  UserDTO, 
  void, 
  { rejectValue: string }
>("profile/fetchProfile", async (_, thunkAPI) => {
  try {
    return await getMyProfile();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const updateProfile = createAsyncThunk<
  UserDTO,
  FormData,
  { rejectValue: string }
>("profile/updateProfile", async (formData, thunkAPI) => {
  try {
    return await updateMyProfile(formData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<UserDTO>) => {
          state.user = action.payload;
        }
      );
  },
});

export const { setUser, logout } = profileSlice.actions;
export default profileSlice.reducer;
