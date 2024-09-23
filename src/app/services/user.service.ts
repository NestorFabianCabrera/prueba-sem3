import { Injectable } from '@angular/core';
import { User } from "../interface/user.interface";
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../user-form/user-form.component";

@Injectable({
  providedIn: 'root' // Hago que este servicio esté disponible en toda la aplicación
})
export class UserService {
  // Donde almaceno los usuarios
  private users: User[] = [];
  // El BehSub mantiene un estado actual y emite ese estado a cualquier nuevo suscriptor
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  // Observable para que otros componentes se suscriban
  users$ = this.usersSubject.asObservable();

  constructor(private matDialog: MatDialog) {} // Inyecto MatDialog en el constructor

  // Agregar o actualizar dependiendo
  addUser(user: User): void {
    // Busco si el usuario ya existe por el email q tenga el user
    const index = this.users.findIndex(u => u.email === user.email);
    if (index === -1) {
      // para agregarlo al arreglo por si no existe
      this.users.push(user);
    } else {
      // si existe actualizo la info
      this.users[index] = { ...this.users[index], ...user };
    }
    this.usersSubject.next([...this.users]); // mando o emito el nuevo estado de users
  }


  // Para poder mostrar la ventana modal
  openDialog(user?: User) {
    const dialogRef = this.matDialog.open(UserFormComponent, {
      data: user // Paso los datos del usuario al diálogo si existen
    });
  }

  // Cierro todos los diálogos
  closeDialog() {
    this.matDialog.closeAll();
  }
}
