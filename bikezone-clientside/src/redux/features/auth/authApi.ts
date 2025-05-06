import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["userOrders"],
    }),
    register: builder.mutation({
      query: (createUser) => ({
        url: "/auth/register",
        method: "POST",
        body: createUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
