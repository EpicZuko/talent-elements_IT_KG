import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../../api/ApiFetch'
import {
  managergetProfileUrl,
  managergetCardGroupsUrl,
  managerStudentsUrl,
  managerPutStudentsUrl,
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
      // console.log(response)
      return { managerCardGroup }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerStudents = createAsyncThunk(
  'manager/managerGetStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managerStudentsUrl,
      })
      const managerStudents = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        managerStudents.push({
          id: response[i]?.id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].name,
          group: response[i].groupName,
          dateOfRegistration: response[i].date_now,
          payment: response[i].pay,
          action: response[i].block,
        })
      }
      // eslint-disable-next-line no-unused-expressions
      ;async (props, { rejectWithValue }) => {
        try {
          const response = await ApiFetch({
            url: `${managerPutStudentsUrl}?studentId=${props.id}`,
            method: 'PUT',
            body: JSON.stringify(),
          })
          console.log(response)
          return response
        } catch (error) {
          return rejectWithValue(error?.message)
        }
      }
      return { managerStudents }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
