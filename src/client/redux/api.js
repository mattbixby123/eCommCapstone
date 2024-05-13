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

    // fetchCustomerDetails: builder.query({
    //     query: () => 'auth/me',
    //   }),

    fetchAllProducts: builder.query({
      query: () => `api/product`, // Add pagination parameters
    }),

    fetchProductById: builder.query({
      query:(productId) => `api/product/${productId}`,
    }),

    fetchBooksById: builder.query({
      query:(bookId) => `api/product/${bookId}`,
    }),

    fetchComicsById: builder.query({
      query:(comicId) => `api/product/${comicId}`,
    }),

    fetchMagazinesById: builder.query({
      query:(magazineId) => `api/product/${magazineId}`,
    }),
    addToCartProduct: builder.mutation({
      query: ({ sessionId, productId, quantity }) => ({
        url: '/cartitem',
        method: 'POST',
        body: { 
          sessionId: parseInt(sessionId), 
          productId: parseInt(productId), 
          quantity: parseInt(quantity) 
        },
      }),
    }),
    addToCartBook: builder.mutation({
      query: ({ sessionId, productId, quantity }) => ({
        url: '/cartitem',
        method: 'POST',
        body: { 
          sessionId: parseInt(sessionId), 
          productId: parseInt(productId), 
          quantity: parseInt(quantity) 
        },
      }),
    }),
    addToCartComic: builder.mutation({
      query: ({ comicId, ...body }) => ({
        url: '/cartitem',
        method: 'POST',
        body: { comicId, ...body}
      }),
    }),
    addToCartMagazine: builder.mutation({
      query: ({ magazineId, ...body }) => ({
        url: '/cartitem',
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

    fetchOrderHistory: builder.query({
      query: (customerId) => `/api/orderDetail/${customerId}`,
    }),

    fetchAllCustomerData: builder.query({
      query: () => '/api/customer',
    }),
    
  })
})

export const {
  useFetchAllProductsQuery,
  useFetchBooksByIdQuery,
  useFetchComicsByIdQuery,
  useFetchMagazinesByIdQuery,
  useFetchProductByIdQuery,
  useRegistrationFormMutation,
  useFetchCustomerDetailsQuery,
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useWelcomeQuery,
  useAddToCartProductMutation,
  useAddToCartBookMutation,
  useAddToCartComicMutation,
  useAddToCartMagazineMutation,
  useRemoveFromCartMutation,
  useSaveForLaterMutation,
  useFetchOrderHistoryQuery,
  useFetchAllCustomerDataQuery
} = api;