import { apiSlice } from './apiSlice';

const USERS_URL = 'users';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    singup:builder.mutation({
      query:data =>({
        url:USERS_URL,
        method:'POST',
        body:data
      })
    }),
    logout:builder.mutation({
      query:() =>({
        url:`${USERS_URL}/logout`,
        method:'POST'
      })
    }),
    updateProfile:builder.mutation({
      query:data =>({
        url:`${USERS_URL}/profile`,
        method:'PUT',
        body:data
      })
    })
    // Define other endpoints as needed
  }),
});

export const { useLoginMutation, useSingupMutation,useLogoutMutation,useUpdateProfileMutation } = usersApiSlice;
