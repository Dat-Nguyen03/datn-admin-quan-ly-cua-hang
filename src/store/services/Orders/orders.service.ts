import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getAllOrder: builder.query<any, { limit: number; page: number }>({
      query: (options) => `/orders?_limit=${options.limit}&_page=${options.page}`,
      providesTags: ['Orders']
    }),

    /**Lay order theo id */
    getOrderById: builder.query({
      query: (id: string) => `/order/${id}`,
      providesTags: ['Orders']
    }),

    /**Order cho xac nhan */
    getAllOrderPending: builder.query<any, { limit: number; page: number }>({
      query: (options) => `/order-pending?_limit=${options.limit}&_page=${options.page}`,
      providesTags: ['Orders']
    }),

    /**Order hoan thanh */
    getAllOrderDone: builder.query<any, { limit: number; page: number }>({
      query: (options) => `/order-done?_limit=${options.limit}&_page=${options.page}`,
      providesTags: ['Orders']
    }),

    /**Orders da huy */
    getAllOrderCancel: builder.query<any, { limit: number; page: number }>({
      query: (options) => `/order-canceled?_limit=${options.limit}&_page=${options.page}`,
      providesTags: ['Orders']
    }),

    /**Lay orders da xac nhan */
    getAllOrderConfirm: builder.query<any, { limit: number; page: number }>({
      query: (options) => `/order-confirmed?_limit=${options.limit}&_page=${options.page}`,
      providesTags: ['Orders']
    }),

    /**Cap nhat trang thai order -> done */
    doneOrder: builder.mutation({
      query: (id: string) => ({
        url: `/order/done/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Orders']
    }),

    /**Cap nhat trang thai order -> comfirmed */
    confirmOrder: builder.mutation({
      query: (id: string) => ({
        url: `/order/confirmed/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Orders']
    }),

    /**Cap nhat trang thai -> canceled */
    cancelOrder: builder.mutation({
      query: (id: string) => ({
        url: `/order/canceled/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const {
  useGetAllOrderQuery,
  useGetOrderByIdQuery,
  useGetAllOrderPendingQuery,
  useGetAllOrderDoneQuery,
  useGetAllOrderCancelQuery,
  useGetAllOrderConfirmQuery,
  useDoneOrderMutation,
  useConfirmOrderMutation,
  useCancelOrderMutation
} = orderApi
