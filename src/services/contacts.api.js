import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Auth', 'Contacts'],
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => '/users/current',
      // providesTags: ['Auth'],

    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/users/signup',
        body: credentials,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        body: credentials,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: '/users/logout',
        body: credentials,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: (result, error, arg) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Contacts', id })),
            { type: 'Contacts', id: 'LIST' }
          ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContact: builder.mutation({
      query: ({ name, number }) => ({
        url: '/contacts',
        method: 'POST',
        body: { name, number },
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    updateContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: { name, number },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Contacts', id: arg.id }],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contactsApi;
