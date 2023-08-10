import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../api/ApiFetch'
import { MentorInstructorHeaderSeeUrl } from '../../utils/constants/url'

export const MentorHeaderRequest = createAsyncThunk(
  'header/request',
  async () => {
    const response = await ApiFetch({
      url: `${MentorInstructorHeaderSeeUrl}`,
    })
    return response
  }
)

const initialState = {
  status: null,
  name: '',
  avatar: null,
}
export const MentorInstructorHeaderSlice = createSlice({
  name: 'header',
  initialState,
  extraReducers: {
    [MentorHeaderRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorHeaderRequest.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      state.name = action.payload.fullName
      state.avatar = action.payload.photo
    },
    [MentorHeaderRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
  },
})
export const MentorInsctructorHeaderAction = MentorInstructorHeaderSlice.actions
