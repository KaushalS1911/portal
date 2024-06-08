import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession } from './utils';
import { AUTH_API } from '../../../config-global';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  vendor: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      vendor: action.payload.vendor,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      vendor: action.payload.vendor,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      vendor: action.payload.vendor,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      vendor: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const VENDOR_KEY = 'vendor';
const PHONE_KEY = 'phone'

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const vendor = sessionStorage.getItem(VENDOR_KEY);
      const phone = sessionStorage.getItem(PHONE_KEY);

      if (vendor && phone) {
        setSession(vendor, phone);

        // const response = await axios.get(endpoints.auth.me);

        // const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            vendor: {
              csp_code: vendor,
              phone_number: phone
              ,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            vendor: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          vendor: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (data) => {
    const response = await axios.post(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp_login`, data);

    const { csp_code, phone_number } = response.data.data[0];

    setSession(csp_code, phone_number);

    dispatch({
      type: 'LOGIN',
      payload: {
        vendor: {
          csp_code,
          phone_number
          ,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {

    const response = await axios.post(`${AUTH_API}${endpoints.auth.login}`, data);

    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.vendor ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      vendor: state.vendor,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.vendor, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
