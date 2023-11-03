import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userEmail: string = '';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor( private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
  
  onLogout(){
    this.authService.logout();
  }
}
