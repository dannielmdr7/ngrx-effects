import { Usuario } from './../../models/usuario.model';
import { cargarUsuario } from './../../store/actions/usuario.actions';
import { AppState } from './../../store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario!:Usuario;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('usuario').subscribe(({ user }) => {
      this.usuario= user;

    })
    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({ id }))

    })
  }

}
