import { categoryReducer, drawerReducers, toppingReducers, sizeReducers, voucherReducer } from './slices'

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { userApi } from './services/Users'
import { categoryApi } from './services/Categories/category.service'
import { sizeApi } from './services/Sizes'
import { orderApi } from './services/Orders'
import { orderReducer } from './slices/Orders/order.slice'
import { VoucherApi, toppingApi } from './services'

const middlewares = [
  toppingApi.middleware,
  userApi.middleware,
  categoryApi.middleware,
  sizeApi.middleware,
  orderApi.middleware,
  VoucherApi.middleware
]

export const store = configureStore({
  reducer: {
    /* redux toolkit query */
    [toppingApi.reducerPath]: toppingApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [VoucherApi.reducerPath]: VoucherApi.reducer,

    /* redux toolkit */
    drawer: drawerReducers,
    toppings: toppingReducers,
    categories: categoryReducer,
    sizes: sizeReducers,
    orders: orderReducer,
    vouchers: voucherReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
