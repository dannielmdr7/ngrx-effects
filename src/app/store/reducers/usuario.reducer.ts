import { Usuario } from './../../models/usuario.model';
import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';

export interface UsuarioState {
  id: string,
  user: Usuario,
  loaded: boolean,
  loading: boolean,
  error: any
}

export const UsuarioInitialState: UsuarioState = {
  id: '',
  user: { avatar: '', email: '', first_name: '', id: 0, last_name: '' },
  loaded: false,
  loading: false,
  error: null
};

export const UsuarioReducer = createReducer(UsuarioInitialState,

  on(cargarUsuario, (state, { id }) => (
    {
      ...state,
      loading: true,
      id
    }
  )),
  on(cargarUsuarioSuccess, (state, { Usuario }) => 
  (
    {
    ...state,
    user: {...Usuario},
    loading: false,
    loaded: true,
    error:null
  }
  )),
  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    user: {avatar:'',email:'',first_name:'',id:0,last_name:''},
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  })),



);
