import { Component, OnInit } from '@angular/core';
import { UserService} from "../services/user.service";
import { User} from "../interface/user.interface";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'age', 'buttons'];
  dataSource: MatTableDataSource<User>;
  seeComponent: boolean = false;
  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<User>([]);
  }
  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.dataSource.data = users;
    });
  }
  openDialog(user: User) {
    this.userService.openDialog(user);
  }
  protected readonly onclick = onclick;
}
