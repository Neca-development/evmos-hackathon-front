// import { clientsApi } from '@entities/clients/clients.api'
// import clientSlice from '@entities/clients/model/client.slice'
// import targetSlice from '@entities/targets/model/target.slice'
// import { targetsApi } from '@entities/targets/targets.api'
// import { authApi } from '@features/auth/auth.api'
// import authSlice from '@features/auth/model/auth.slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    // auth: authSlice,
    // client: clientSlice,
    // target: targetSlice,
    // [targetsApi.reducerPath]: targetsApi.reducer,
    // // [authApi.reducerPath]: authApi.reducer,
    // [clientsApi.reducerPath]: clientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat
      // authApi.middleware,
      // clientsApi.middleware,
      // targetsApi.middleware
      (),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
