import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if(token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('Content-type', 'application/json')
      return headers;
    }
  }),
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => '/books',
    }),
    fetchBooksById: builder.query({
      query:(bookId) => `/books/${bookId}`,
    }),
    fetchAllComics: builder.query({
      query: () => '/comics',
    }),
    fetchComicsById: builder.query({
      query:(comicId) => `/comics/${comicId}`,
    }),
    fetchAllMagazines: builder.query({
      query: () => '/magazines',
    }),
    fetchMagazinesById: builder.query({
      query:(magazineId) => `/magazines/${magazineId}`,
    }),
    registrationForm: builder.mutation({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
    authenticate: builder.query({
      query: () => ({
        url: '/users/me'
      })
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    welcome: builder.query({
      query: () => '/',
    }),
    addToCartBook: builder.mutation({
      query: ({ bookId, ...body }) => ({
        url: '/cart/add/books',
        method: 'POST',
        body: { bookId, ...body}
      }),
    }),
    addToCartComic: builder.mutation({
      query: ({ comicId, ...body }) => ({
        url: '/cart/add/comics',
        method: 'POST',
        body: { comicId, ...body}
      }),
    }),
    addToCartMagazine: builder.mutation({
      query: ({ magazineId, ...body }) => ({
        url: '/cart/add/magazines',
        method: 'POST',
        body: { magazineId, ...body}
      }),
    }),
    fetchUserDetails: builder.query({
      query: () => '/users/me',
    }),
    fetchOrderHistory: builder.query({
      query: () => '/orderhistory',
    })
  })
})