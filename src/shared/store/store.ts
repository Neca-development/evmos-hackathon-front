import { daoApi } from '@entities/dao/api/dao.api'
import { mintRequestApi } from '@entities/mint-request/api/mint-request.api'
import { userApi } from '@entities/user/user.api'
import { votingApi } from '@entities/voting/api/voting.api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    [daoApi.reducerPath]: daoApi.reducer,
    [mintRequestApi.reducerPath]: mintRequestApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [votingApi.reducerPath]: votingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      daoApi.middleware,
      mintRequestApi.middleware,
      userApi.middleware,
      votingApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
