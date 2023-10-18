import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
    jsonContentType: "application/json",
  }),
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: (token) => {
        return {
          url: "/user",
          method: "get",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "post",
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: "/signup",
        method: "post",
        body: { email, password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLoadUserQuery,
  useLazyLoadUserQuery,
} = authApi;
