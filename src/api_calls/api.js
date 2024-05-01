import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:3000/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log(getState());
      if(token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-type', 'application/json')
      return headers;
    }
  }),
  // tagTypes: ['Books'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => '/product'
    }),

    fetchAllBooks: builder.query({
      query: () => '/product/books',
      // transformResponse: response => response.books,
      // providesTags: ['Books']
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
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    authenticate: builder.query({
      query: () => ({
        url: 'auth/me'
      })
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
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
    removeFromCartBook: builder.mutation({
      query: ({ bookId }) => ({
        url: '/cart/remove/books',
        method: 'DELETE',
        body: { bookId }
      }),
    }),
    removeFromCartComic: builder.mutation({
      query: ({ comicId }) => ({
        url: '/cart/remove/comics',
        method: 'DELETE',
        body: { comicId }
      }),
    }),
    removeFromCartMagazine: builder.mutation({
      query: ({ magazineId }) => ({
        url: '/cart/remove/magazines',
        method: 'DELETE',
        body: { magazineId }
      }),
    }),
    saveForLaterBook: builder.mutation({
      query: ({ bookId }) => ({
        url: '/cart/save-for-later/books',
        method: 'POST',
        body: { bookId }
      }),
    }),
    saveForLaterComic: builder.mutation({
      query: ({ comicId }) => ({
        url: '/cart/save-for-later/comics',
        method: 'POST',
        body: { comicId }
      }),
    }),
    saveForLaterMagazine: builder.mutation({
      query: ({ magazineId }) => ({
        url: '/cart/save-for-later/magazines',
        method: 'POST',
        body: { magazineId }
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

export const {
  useFetchAllProductsQuery,
  useFetchAllBooksQuery,
  useFetchBooksByIdQuery,
  useFetchAllComicsQuery,
  useFetchComicsByIdQuery,
  useFetchAllMagazinesQuery,
  useFetchMagazinesByIdQuery,
  useRegistrationFormMutation,
  useAuthenticateQuery,
  useLoginMutation,
  useWelcomeQuery,
  useAddToCartBookMutation,
  useAddToCartComicMutation,
  useAddToCartMagazineMutation,
  useRemoveFromCartMutation,
  useSaveForLaterMutation,
  useFetchUserDetailsQuery,
  useFetchOrderHistoryQuery
} = api;