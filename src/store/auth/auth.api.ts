import { createApi } from '@reduxjs/toolkit/query/react'
import { setUser } from '@store/auth/auth.slice'
import { baseQueryWithReauth } from '@store/queries/with-reauth.query'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (body: { phoneNumber: string }) => {
        return {
          url: 'auth/users/send-otp/',
          method: 'POST',
          body,
        }
      },
    }),
    registration: builder.mutation({
      query: (body: { phoneNumber: string }) => {
        return {
          url: 'auth/users/',
          method: 'POST',
          body,
          credentials: 'include',
        }
      },

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
        } catch {}
      },
    }),
    login: builder.mutation({
      query: (body: { phoneNumber: string; otp: string }) => {
        return {
          url: 'auth/users/login/',
          method: 'POST',
          body,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          console.log(res)
          console.log(res.data.data)

          await dispatch(setUser({ token: res.data.data.accessToken }))
        } catch {}
      },
    }),
    refreshTokens: builder.query({
      query: (credentials) => {
        return {
          url: 'auth/users/refresh-tokens/',
          method: 'GET',
          body: { ...credentials },
          credentials: 'include',
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegistrationMutation, useSendOtpMutation } = authApi
