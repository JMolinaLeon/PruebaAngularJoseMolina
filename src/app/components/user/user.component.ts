import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../Models/usuario';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required ]   ],
    identificacion: [ , [ Validators.required] ],
    fecha: [ , [ Validators.required] ],
    pasatiempo: [ , [ Validators.required] ],
  })

  public usuario: Usuario;
  public usuarios: Usuario[];
  public newUsuarios: Usuario[];
  public img: string;
  public id: string;
  public edadU: number;
  currentInput = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.usuario = new Usuario();
    this.usuarios = [];
    this.newUsuarios = [];
    this.img = '';
    let id = this.route.snapshot.paramMap.get('id') !== null ? this.route.snapshot.paramMap.get('id') : '';
    this.id = id ? id : '';
    this.edadU = 0;
  }

  ngOnInit(): void {
    let user = localStorage.getItem('User');
    if(user){
      this.usuario = JSON.parse(user);
      this.img = this.usuario.img ? this.usuario.img : '';
      this.currentInput = this.usuario.selectImg ? this.usuario.selectImg : '';
      this.edadU = this.usuario.edad ? parseInt(this.usuario.edad) : 0;
    } else {
      this.usuario = {
        id: '',
        nombre: '',
        pasatiempo: '',
        edad: '',
        identificacion: '',
        fecha: '',
        img: '',
        selectImg: ''
      }
    }
    let usuarios = localStorage.getItem('Usuarios');
    if(usuarios){
      this.usuarios = JSON.parse(usuarios) ;
      const searchIndex = this.usuarios.findIndex((u) => u.id==this.id);
      this.usuario = this.usuarios[searchIndex];
      localStorage.setItem("User", JSON.stringify(this.usuario))
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

  pokemons = [
    { id: 1, name: 'poke1'},
    { id: 2, name: 'poke2'},
    { id: 3, name: 'poke3'},
    { id: 4, name: 'poke4' },
    { id: 5, name: 'poke5'},
    { id: 6, name: 'poke6'},
    { id: 7, name: 'poke7' },
    { id: 8, name: 'poke8'},
    { id: 9, name: 'poke9'}
  ];

  selectEvent(item: any) {
    this.usuario.pasatiempo = item.name;
  }

  searchCleared(){
    this.usuario.pasatiempo = '';
  }

  saveData(){
    if(this.miFormulario.valid) {

      this.usuario.img = this.img;
      this.usuario.selectImg = this.currentInput;

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
      let url = '/user/' + this.usuario.id;
      this.router.navigateByUrl(url);
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.img = reader.result as string;
      this.currentInput = event.target.files[0].name;
    };
  }

  public clearImg(){
    this.img = '';
    this.currentInput = '';
  }

}


