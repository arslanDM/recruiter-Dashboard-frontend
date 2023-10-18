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
    getAllUsers: builder.query({
      query: (state) => ({
        url: "/getEmployer",
        headers: {
          authorization: `Bearer ${state?.userToken}`,
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
  useGetAllUsersQuery,
} = userApi;
