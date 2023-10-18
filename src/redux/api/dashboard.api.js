import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//your payload object
// payload={token: value, //get from auth state or local storage
// body:{}

// }

export const dashboardApi = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/dashboard`, //change according to your API path
    jsonContentType: 'application/json',
  }),
  endpoints: (builder) => ({
    //request that does not require a token
    getData: builder.query({
      query: () => {
        return {
          url: '/',
          method: 'get',
        };
      },
    }),
    //requests that require token
    getData1: builder.query({
      query: (payload) => {
        return {
          url: '/',
          method: 'get',
          headers: {
            authorization: `Bearer ${payload.token}`,
          },
        };
      },
    }),
    addData: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'post',
        body: payload.body,
      }),
    }),
    addData1: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'put',
        body: payload.body,
      }),
    }),
    addData2: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'patch',
        body: payload.body,
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetData1Query,
  useAddDataMutation,
  useAddData1Mutation,
  useAddData2Mutation,
} = dashboardApi;
