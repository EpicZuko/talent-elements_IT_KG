import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  seoAdminGetAllGroupsUrl,
  seoAdminProfileUrl,
} from '../../../utils/constants/url'

export const getProfile = createAsyncThunk(
  'seoAdmin/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${seoAdminProfileUrl}`,
      })
      const notification = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }
      return notification
    } catch (error) {
      return rejectWithValue(error?.card)
    }
  }
)
export const getAllGroups = createAsyncThunk(
  'seoAdmin/getAllGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${seoAdminGetAllGroupsUrl}`,
      })
      const cardGroup = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        cardGroup.push({
          id: response[i]?.id,
          img: response[i].photo,
          students: response[i].count,
          title: response[i].groupName,
        })
      }
      return cardGroup
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

const getSeoAdminGroupSlice = createSlice({
  name: 'seoAdminGroupsSlce',
  initialState: {
    card: [],
    error: null,
    profileSeoAdmin: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroups.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.loading = 'success'
        state.card = action.payload
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // get profile
      .addCase(getProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = 'success'
        state.profileSeoAdmin = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
  },
})
export const getAllGroupAction = getSeoAdminGroupSlice.actions
export default getSeoAdminGroupSlice
