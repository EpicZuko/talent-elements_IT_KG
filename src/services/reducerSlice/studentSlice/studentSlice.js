import { createSlice } from '@reduxjs/toolkit'
import {
  getCoursesStudent,
  getStudentHomeWork,
  getStudentLesson,
  getStudentMyGroup,
  getStudentMyProfile,
  getStudentNotification,
  getStudentProfile,
  getStudentProfileProgress,
  notificationStudentManager,
  postStudentFileUpload,
  postStudentTextForm,
} from './studentAction'

const initialState = {
  studentProfile: {
    studentProfile: {},
    status: null,
  },
  getStudentCourses: [],
  getStudentCousesStatus: null,
  getStudentMyGroup: [],
  getStudentMyGroupStatus: null,
  getStudentProfileProgress: {
    completedCount: 0,
    inProgressCount: 0,
    notStartedCount: 0,
    studentProfileProgress: [],
    profileImg: '',
    email: '',
    studentProfileStatus: null,
  },
  getStudentMyProfile: {
    completedCount: 0,
    inProgressCount: 0,
    notStartedCount: 0,
    studentMyProfile: [],
    profileImg: '',
    studentMyProfileStatus: null,
  },
  getStudentNotification: [],
  managerMessage: {
    message: [],
  },
  managerMessageStatus: null,
  getStudentNotificationStatus: null,
  getStaffAdminLesson: [],
  getStaffAdminLessonStatus: null,
  getStudentLessonsArray: {
    studentLesson: [],
    status: null,
  },
  getStudentHomeWorkArray: [],
  homeWorkGroupName: null,
  getStudentHomeWorkStatus: null,
  postStudentFileUploadStatus: null,
  postStudentFileUploadOpen: false,
  postStudentTextFormStatus: null,
  postStudentTextFormSnackbar: {
    open: false,
  },
}
const studentSlice = createSlice({
  name: 'studentSlice',
  initialState,
  reducers: {
    clearStudentNotificationProfile(state, action) {
      state.studentProfile.studentProfile.notificationNumberCount =
        action.payload.notificationNumberCount
    },
    snackBarPostTextForm(state, action) {
      state.postStudentTextFormSnackbar.open = action.payload.open
      state.postStudentTextFormStatus = action.payload.status
    },
    snackBarPostUploadFile(state, action) {
      state.postStudentFileUploadOpen = action.payload.open
      state.postStudentFileUploadStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentProfile.pending, (state) => {
        state.studentProfile.status = 'pending'
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        state.studentProfile.status = 'success'
        state.studentProfile.studentProfile = action.payload.profileStudent
      })
      .addCase(getStudentProfile.rejected, (state) => {
        state.studentProfile.status = 'error'
        state.studentProfile.studentProfile = []
      })
      // get student couses

      .addCase(getCoursesStudent.pending, (state) => {
        state.getStudentCousesStatus = 'pending'
      })
      .addCase(getCoursesStudent.fulfilled, (state, action) => {
        state.getStudentCousesStatus = 'success'
        state.getStudentCourses = action.payload.courses
      })
      .addCase(getCoursesStudent.rejected, (state) => {
        state.getStudentCousesStatus = 'error'
        state.getStudentCourses = []
      })
      // getStudentMyGroup
      .addCase(getStudentMyGroup.pending, (state) => {
        state.getStudentMyGroupStatus = 'pending'
      })
      .addCase(getStudentMyGroup.fulfilled, (state, action) => {
        state.getStudentMyGroupStatus = 'success'
        state.getStudentMyGroup = action.payload.studentMyGroupRaiting
      })
      .addCase(getStudentMyGroup.rejected, (state) => {
        state.getStudentMyGroup = 'error'
        state.getStudentMyGroup = []
      })
      // getStudentProfileProgress
      .addCase(getStudentProfileProgress.pending, (state) => {
        state.getStudentProfileProgress.studentProfileStatus = 'pending'
      })
      .addCase(getStudentProfileProgress.fulfilled, (state, action) => {
        state.getStudentProfileProgress.studentProfileStatus = 'success'

        state.getStudentProfileProgress.studentProfileProgress =
          action.payload.studentProgressId.studentProfileProgress

        state.getStudentProfileProgress.completedCount =
          action.payload.studentProgressId.completedCount

        state.getStudentProfileProgress.inProgressCount =
          action.payload.studentProgressId.inProgressCount

        state.getStudentProfileProgress.notStartedCount =
          action.payload.studentProgressId.notStartedCount

        state.getStudentProfileProgress.profileImg =
          action.payload.studentProgressId.profileImg

        state.getStudentProfileProgress.email =
          action.payload.studentProgressId.email
      })
      .addCase(getStudentProfileProgress.rejected, (state) => {
        state.getStudentProfileProgress.studentProfileStatus = 'error'
        state.getStudentProfileProgress.studentProfileProgress = []
      })
      // getStudentMyProfile
      .addCase(getStudentMyProfile.pending, (state) => {
        state.getStudentMyProfile.studentMyProfileStatus = 'pending'
      })
      .addCase(getStudentMyProfile.fulfilled, (state, action) => {
        state.getStudentMyProfile.studentMyProfileStatus = 'success'

        state.getStudentMyProfile.studentMyProfile =
          action.payload.studentMyProfile.studentMyProfile

        state.getStudentMyProfile.completedCount =
          action.payload.studentMyProfile.completedCount

        state.getStudentMyProfile.inProgressCount =
          action.payload.studentMyProfile.inProgressCount

        state.getStudentMyProfile.notStartedCount =
          action.payload.studentMyProfile.notStartedCount

        state.getStudentMyProfile.profileImg =
          action.payload.studentMyProfile.profileImg
      })
      .addCase(getStudentMyProfile.rejected, (state) => {
        state.getStudentMyProfile.studentMyProfileStatus = 'error'
        state.getStudentMyProfile.studentProfileProgress = []
      })
      // getStudentNotification
      .addCase(getStudentNotification.pending, (state) => {
        state.getStudentNotificationStatus = 'pending'
      })
      .addCase(getStudentNotification.fulfilled, (state, action) => {
        state.getStudentNotificationStatus = 'success'

        state.getStudentNotification =
          action.payload.getStudentNotificationArray
      })
      .addCase(getStudentNotification.rejected, (state) => {
        state.getStudentProfileProgress.studentProfileStatus = 'error'
        state.getStudentNotification = []
      })

      // get student lessson
      .addCase(getStudentLesson.pending, (state) => {
        state.getStudentLessonsArray.status = 'pending'
      })
      .addCase(getStudentLesson.fulfilled, (state, action) => {
        state.getStudentLessonsArray.status = 'success'
        state.getStudentLessonsArray.studentLesson =
          action.payload.studentLesson.studentLesson
      })
      .addCase(getStudentLesson.rejected, (state) => {
        state.getStudentLessonsArray.status = 'error'
        state.getStudentLessonsArray.studentLesson = []
      })
      //
      // get student home work
      .addCase(getStudentHomeWork.pending, (state) => {
        state.getStudentHomeWorkStatus = 'pendign'
      })
      .addCase(getStudentHomeWork.fulfilled, (state, action) => {
        state.getStudentHomeWorkStatus = 'success'
        state.getStudentHomeWorkArray = action.payload.studentHomeWorkArray
        state.homeWorkGroupName = action.payload.studentHomeWork.groupName
      })
      .addCase(getStudentHomeWork.rejected, (state) => {
        state.getStudentHomeWorkStatus = 'error'
        state.getStudentHomeWorkArray = []
      })
      // post student file upload
      .addCase(postStudentFileUpload.pending, (state) => {
        state.postStudentFileUploadStatus = 'pending'
        state.postStudentFileUploadOpen = false
      })
      .addCase(postStudentFileUpload.fulfilled, (state) => {
        state.postStudentFileUploadStatus = 'success'
        state.postStudentFileUploadOpen = true
      })
      .addCase(postStudentFileUpload.rejected, (state) => {
        state.postStudentFileUploadStatus = 'error'
        state.postStudentFileUploadOpen = true
      })
      // post Student Text Form
      .addCase(postStudentTextForm.pending, (state) => {
        state.postStudentTextFormStatus = 'pending'
        state.postStudentTextFormSnackbar.open = false
      })
      .addCase(postStudentTextForm.fulfilled, (state) => {
        state.postStudentTextFormStatus = 'success'
        state.postStudentTextFormSnackbar.open = true
      })
      .addCase(postStudentTextForm.rejected, (state) => {
        state.postStudentTextFormStatus = 'error'
        state.postStudentTextFormSnackbar.open = true
      })
      // get student manager notification
      .addCase(notificationStudentManager.pending, (state) => {
        state.managerMessageStatus = 'pending'
      })
      .addCase(notificationStudentManager.fulfilled, (state, action) => {
        state.managerMessage.message = action.payload.managerMessage
      })
      .addCase(notificationStudentManager.rejected, (state) => {
        state.managerMessageStatus = 'error'
        state.managerMessage.message = []
      })
  },
})
export const studentAction = studentSlice.actions
export default studentSlice
