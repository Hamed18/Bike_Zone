/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://bikezone-serverside-seven.vercel.app/api",
    // "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result?.error?.status === 404) {
  //   toast.error(result?.error?.data?.message);
  // }

  // const token = result?.data?.token as string;
  // const user = result?.data?.data as {};

  // if (token) {
  //   api.dispatch(
  //     setUser({
  //       user,
  //       token,
  //     })
  //   );
  // } else {
  //   api.dispatch(logout());
  // }

  // if (result?.error?.status === 401) {
  //   //* Send Refresh
  //   const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
  //     method: "POST",
  //     credentials: "include",
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   if (data?.data?.accessToken) {
  //     const user = (api.getState() as RootState).auth.user;

  //     api.dispatch(
  //       setUser({
  //         user,
  //         token: data.data.accessToken,
  //       })
  //     );

  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logout());
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["userOrders", "products","allOrders"],
  endpoints: () => ({}),
});
