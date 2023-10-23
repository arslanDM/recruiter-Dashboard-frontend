import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/user`,
    jsonContentType: "application/json",
  }),
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: (payload) => {
        return {
          url: "/",
          method: "get",
          headers: {
            authorization: `Bearer ${payload.token}`,
          },
        };
      },
    }),
    createStaff: builder.mutation({
      query: (payload) => ({
        url: "/createUser",
        method: "POST",
        body: payload.body,
        headers: {
          authorization: `Bearer ${payload?.state?.userToken}`,
        },
      }),
    }),
    createCandidate: builder.mutation({
      query: (payload) => ({
        url: "/createCandidate",
        method: "POST",
        body: payload.body,
        headers: {
          authorization: `Bearer ${payload?.token}`,
        },
      }),
    }),
    createEmployer: builder.mutation({
      query: (payload) => ({
        url: "/createEmployer",
        method: "POST",
        body: payload.body,
        headers: {
          authorization: `Bearer ${payload?.token}`,
        },
      }),
    }),
    createJob: builder.mutation({
      query: (payload) => ({
        url: "/createJob",
        method: "POST",
        body: payload.body,
        headers: {
          authorization: `Bearer ${payload?.token}`,
        },
      }),
    }),
    createInterview: builder.mutation({
      query: (payload) => ({
        url: "/createInterview",
        method: "POST",
        body: payload.body,
        headers: {
          authorization: `Bearer ${payload?.token}`,
        },
      }),
    }),
    getAllUsers: builder.query({
      query: (state) => ({
        url: "/getStaff",
        headers: {
          authorization: `Bearer ${state?.userToken}`,
        },
      }),
    }),
    getAllCandidates: builder.query({
      query: (state) => ({
        url: "/getCandidate",
        headers: {
          authorization: `Bearer ${state}`,
        },
      }),
    }),
    getAllEmployers: builder.query({
      query: (state) => ({
        url: "/getEmployer",
        headers: {
          authorization: `Bearer ${state}`,
        },
      }),
    }),
    getAllJobs: builder.query({
      query: (state) => ({
        url: "/getJob",
        headers: {
          authorization: `Bearer ${state}`,
        },
      }),
    }),
    getAllFeedback: builder.query({
      query: (state) => ({
        url: "/feedback",
        headers: {
          authorization: `Bearer ${state}`,
        },
      }),
    }),
    getAllFeedbackById: builder.query({
      query: (state) => ({
        url: `/feedback/${state.id}`,
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoadUserQuery,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useLazyLoadUserQuery,
  useCreateStaffMutation,
  useCreateEmployerMutation,
  useCreateCandidateMutation,
  useCreateJobMutation,
  useCreateInterviewMutation,
  useGetAllUsersQuery,
  useGetAllCandidatesQuery,
  useGetAllEmployersQuery,
  useGetAllJobsQuery,
  useGetAllFeedbackQuery,
  useGetAllFeedbackByIdQuery,
} = userApi;
