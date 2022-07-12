import * as usuarioActions from './../actions/usuario.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';


@Injectable()
export class UsuarioEffect {
  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) { }

  cargarUsuario$ = createEffect(() => this.actions$.pipe(
    ofType(usuarioActions.cargarUsuario),
    mergeMap((action) => this.usuariosService.getUsersById(action.id)
      .pipe(
        map(user => usuarioActions.cargarUsuarioSuccess({ Usuario: user })),
        catchError(err => of(usuarioActions.cargarUsuarioError({ payload: err })))

      ))
  )
  );
}