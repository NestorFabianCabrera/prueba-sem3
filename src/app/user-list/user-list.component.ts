import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from "../interface/user.interface";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource: MatTableDataSource<User>; // Fuente de datos para la tabla

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<User>([]); // Inicializo la fuente de datos como un array vacío
  }

  ngOnInit(): void {
    // Al inicializar el componente, me suscribo a los cambios en el observable de usuarios
    this.userService.users$.subscribe(users => {
      this.dataSource.data = users; // Actualizo la fuente de datos con la lista de usuarios
    });
  }

  // Método para abrir el diálogo de edición del usuario
  openDialog(user: User) {
    this.userService.openDialog(user); // Abro el diálogo y paso el usuario
  }

  protected readonly onclick = onclick;
}
