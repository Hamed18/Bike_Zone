import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "order/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["userOrders", "products"],
    }),
    updateStatus: builder.mutation({
      query: (orderData) => ({
        url: "order/update-status",
        method: "PATCH",
        body: orderData,
      }),
      invalidatesTags: ["userOrders", "allOrders"],
    }),
    getOrders: builder.query({
      query: () => {
        return {
          url: `/order`,
          method: "GET",
        };
      },
      providesTags: ["allOrders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["allOrders"],
    }),
    getUserOrders: builder.query({
      query: () => {
        return {
          url: `/order/user/orders`,
          method: "GET",
        };
      },
      providesTags: ["userOrders"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetUserOrdersQuery,
  useUpdateStatusMutation,
  useDeleteOrderMutation
} = orderApi;
