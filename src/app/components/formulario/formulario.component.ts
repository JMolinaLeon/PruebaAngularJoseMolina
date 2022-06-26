import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../Models/usuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required ]   ],
    identificacion: [ , [ Validators.required] ],
    fecha: [ , [ Validators.required] ],
    pasatiempo: [ , [ Validators.required] ],
  })

  public usuario: Usuario;
  public usuarios: Usuario[];
  public newUsuarios: Usuario[];

  constructor(private fb: FormBuilder) {
    this.usuario = new Usuario();
    this.usuarios = [];
    this.newUsuarios = [];
  }

  ngOnInit(): void {
    let user = localStorage.getItem('User');
    if(user){
      this.usuario = JSON.parse(user) ;
    } else {
      this.usuario = {
        id: '',
        nombre: '',
        pasatiempo: '',
        edad: '',
        identificacion: '',
        fecha: ''
      }
    }
    let usuarios = localStorage.getItem('Usuarios');
    if(usuarios){
      this.usuarios = JSON.parse(usuarios) ;
    } else {
      this.usuarios = [];
    }
    this.newUsuarios = [];
  }

keyword = 'name';
data = [
    { id: 1, name: 'Jugar Futbol'},
    { id: 2, name: 'Jugar Basquetball'},
    { id: 3, name: 'Jugar Tenis'},
    { id: 4, name: 'Jugar Voleibol' },
    { id: 5,name: 'Jugar Fifa'},
    { id: 6, name: 'Jugar VideoJuegos'}
  ];

  selectEvent(item: any) {
    this.usuario.pasatiempo = item.name;
  }

  searchCleared(){
    this.usuario.pasatiempo = '';
  }

  saveData(){
    if(this.miFormulario.valid) {

      let usuarios = localStorage.getItem('Usuarios');
      if(usuarios){
        this.usuarios = JSON.parse(usuarios) ;
      } else {
        this.usuarios = [];
      }

      this.newUsuarios = [];
      this.newUsuarios = [ ...this.usuarios ];
      if(this.usuarios.length > 0){
        const searchIndex = this.usuarios.findIndex((u) => u.identificacion==this.usuario.identificacion);
        if(searchIndex < 0){
          console.log("no existe");
          this.usuario.id = this.usuarios.length.toString();
          this.newUsuarios.push(this.usuario);
        } else {
          this.newUsuarios = this.newUsuarios.map(item => {
            if(item.identificacion == this.usuario.identificacion){
              let id = item.id;
              this.usuario.id = id;
              item = this.usuario;
            }
            return item;
          })
        }
      } else {
        this.usuario.id = '0';
        this.newUsuarios.push(this.usuario);
      }
      localStorage.setItem("User", JSON.stringify(this.usuario))
      localStorage.setItem("Usuarios", JSON.stringify(this.newUsuarios))
    }
  }

}


