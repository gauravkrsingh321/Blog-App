import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './redux/auth.user.slice'

export const store = configureStore({
  reducer: {
    user: authUserReducer
  },
})