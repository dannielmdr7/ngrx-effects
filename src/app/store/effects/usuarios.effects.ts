import * as usuariosActions from './../actions/usuarios.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';


@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) { }

  cargarUsuarios$ = createEffect(() => this.actions$.pipe(
    ofType(usuariosActions.cargarUsuarios),
    mergeMap(() => this.usuariosService.getUsers()
      .pipe(
        map(usuarios => usuariosActions.cargarUsuariosSuccess({ usuarios })),
        catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))

      ))
  )
  );
}