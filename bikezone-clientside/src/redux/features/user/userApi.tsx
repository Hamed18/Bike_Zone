import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/user`,
          method: "GET",
        };
      },
    }),
    geSingletUser: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/user/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    updateUserActiveStatus: builder.mutation({
      query: (id) => {
        return {
          url: `/user/activation/${id}`,
          method: "PATCH",
        };
      },
    }),
    updatePassword: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/update-password/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserActiveStatusMutation,
  useGeSingletUserQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
