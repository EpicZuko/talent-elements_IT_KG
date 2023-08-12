import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../../api/ApiFetch'
import {
  managergetProfileUrl,
  managergetCardGroupsUrl,
} from '../../../../utils/constants/url'

export const managerGetProfile = createAsyncThunk(
  'manager/managerGetProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managergetProfileUrl,
      })
      const managerProfile = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }
      return { managerProfile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerGetAllGroups = createAsyncThunk(
  'manager/managerGetAllGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managergetCardGroupsUrl,
      })
      const managerCardGroup = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        managerCardGroup.push({
          id: response[i]?.id,
          img: response[i].photo,
          students: response[i].studentsId,
          title: response[i].name,
        })
      }
      return { managerCardGroup }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
