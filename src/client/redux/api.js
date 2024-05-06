import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:3000/'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
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
    me: builder.query({
      query: () => "auth/me",
      providesTags: ["Me"],
    }),
    
    registrationForm: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    logout: builder.mutation ({
      queryFn: () => ({ data: {} }),
      invalidatesTags: ["Me"],
    }),

    welcome: builder.query({
      query: () => '/',
    }),

    fetchAllProducts: builder.query({
      query: (page) => `api/product?page=${page}&pageSize=10`, // Add pagination parameters
    }),

    fetchAllBooks: builder.query({
      query: (page) => `api/product/books?page=${page}&pageSize=10`, // Add pagination parameters
    }),

    fetchBooksById: builder.query({
      query:(productId) => `api/product/${productId}`,
    }),

    fetchAllComics: builder.query({
      query: (page) => `api/product/comics?page=${page}&pageSize=10`, // Add pagination parameters
    }),

    fetchComicsById: builder.query({
      query:(productId) => `api/product/${productId}`,
    }),

    fetchAllMagazines: builder.query({
      query: (page) => `api/product/magazines?page=${page}&pageSize=10`, // Add pagination parameters
    }),

    fetchMagazinesById: builder.query({
      query:(productId) => `api/product/${productId}`,
    }),
     

    // addToCartBook: builder.mutation({
    //   query: ({ bookId, ...body }) => ({
    //     url: '/cart/add/books',
    //     method: 'POST',
    //     body: { bookId, ...body}
    //   }),
    // }),
    // addToCartComic: builder.mutation({
    //   query: ({ comicId, ...body }) => ({
    //     url: '/cart/add/comics',
    //     method: 'POST',
    //     body: { comicId, ...body}
    //   }),
    // }),
    // addToCartMagazine: builder.mutation({
    //   query: ({ magazineId, ...body }) => ({
    //     url: '/cart/add/magazines',
    //     method: 'POST',
    //     body: { magazineId, ...body}
    //   }),
    // }),
    // removeFromCartBook: builder.mutation({
    //   query: ({ bookId }) => ({
    //     url: '/cart/remove/books',
    //     method: 'DELETE',
    //     body: { bookId }
    //   }),
    // }),
    // removeFromCartComic: builder.mutation({
    //   query: ({ comicId }) => ({
    //     url: '/cart/remove/comics',
    //     method: 'DELETE',
    //     body: { comicId }
    //   }),
    // }),
    // removeFromCartMagazine: builder.mutation({
    //   query: ({ magazineId }) => ({
    //     url: '/cart/remove/magazines',
    //     method: 'DELETE',
    //     body: { magazineId }
    //   }),
    // }),
    // saveForLaterBook: builder.mutation({
    //   query: ({ bookId }) => ({
    //     url: '/cart/save-for-later/books',
    //     method: 'POST',
    //     body: { bookId }
    //   }),
    // }),
    // saveForLaterComic: builder.mutation({
    //   query: ({ comicId }) => ({
    //     url: '/cart/save-for-later/comics',
    //     method: 'POST',
    //     body: { comicId }
    //   }),
    // }),
    // saveForLaterMagazine: builder.mutation({
    //   query: ({ magazineId }) => ({
    //     url: '/cart/save-for-later/magazines',
    //     method: 'POST',
    //     body: { magazineId }
    //   }),
    // }),

    // fetchOrderHistory: builder.query({
    //   query: () => '/orderhistory',
    // }),
    
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
  useMeQuery,
  useLoginMutation,
  useWelcomeQuery,
  useAddToCartBookMutation,
  useAddToCartComicMutation,
  useAddToCartMagazineMutation,
  useRemoveFromCartMutation,
  useSaveForLaterMutation,
  useFetchOrderHistoryQuery
} = api;