import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../services/user.service";
import { User } from "../interface/user.interface";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{
  // Defino el formulario como un grupo de formularios
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder, // Inyecto FormBuilder para crear formularios
    private userService: UserService, // Inyecto el servicio que tengo para los users
    @Inject(MAT_DIALOG_DATA) public data: User // Inyecto datos del diálogo
  ) {}

  ngOnInit(): void {
    if(this.data){
      this.userForm = this.userService.initForm(this.data);
    } else {
      this.userForm = this.userService.initForm();
    }
  }

  // método para que se envíe el form (solamente si es valido .valid)
  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this.userService.addUser(user);
      this.userForm.reset();
      this.userService.closeDialog();
    }

  }
}
