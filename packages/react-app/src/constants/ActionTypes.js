import { ActionTypes as AuthActionTypes } from 'okta-redux';

const { AUTH_STATE, LOGIN, LOGOUT } = AuthActionTypes;
export { AUTH_STATE, LOGIN, LOGOUT };

export const SET_USERINFO = 'SET_USERINFO';
export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL_TODOS = 'COMPLETE_ALL_TODOS';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
