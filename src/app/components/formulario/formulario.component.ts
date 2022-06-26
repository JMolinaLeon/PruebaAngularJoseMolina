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

  constructor(private fb: FormBuilder) { 
    this.usuario = new Usuario();

  }

  ngOnInit(): void {
    this.usuario = {
      nombre: '',
      pasatiempo: '',
      edad: '',
      identificacion: '',
      fecha: ''
    }

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
    console.log("datos del empleado", this.usuario);
    console.log(this.miFormulario);
  }

}


