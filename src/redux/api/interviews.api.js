import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const interviewApi = createApi({
  reducerPath: "interviewAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/user`,
    jsonContentType: "application/json",
  }),
  endpoints: (builder) => ({
    getAllInterviews: builder.query({
      query: (payload) => {
        return {
          url: "/interviews",
          method: "get",
          headers: {
            authorization: `Bearer ${payload.token}`,
          },
        };
      },
    }),

    createInterview: builder.mutation({
      query: (payload) => ({
        url: "/createInterview",
        method: "POST",
        body: payload.body,
        headers: {
          authorization: `Bearer ${payload}`,
        },
      }),
    }),
    getInterviewById: builder.query({
      query: (payload) => {
        return {
          url: `interviews/${payload.id}`,
          method: "get",
          headers: {
            authorization: `Bearer ${payload.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllInterviewsQuery,
  useCreateInterviewMutation,
  useGetInterviewByIdQuery,
} = interviewApi;
