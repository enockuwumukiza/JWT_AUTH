import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
