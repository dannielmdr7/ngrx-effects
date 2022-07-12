import { Usuario } from './../../models/usuario.model';
import { createReducer, on } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

export interface UsuariosState {
  users: Usuario[],
  loaded: boolean,
  loading: boolean,
  error: any
}

export const usuariosInitialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
};

export const usuariosReducer = createReducer(usuariosInitialState,

  on(cargarUsuarios, state => ({ ...state, loading: true })),
  on(cargarUsuariosSuccess, (state, { usuarios }) => ({ ...state, users: [...usuarios], loading: false, loaded: true })),
  on(cargarUsuariosError, (state, { payload }) => ({ 
    ...state, users: [],
    loading: false,
    loaded: false,
    error:{
      url:payload.url,
      name:payload.name,
      message:payload.message
    }
  })),



);
