import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedInUser :string;
  showRegister:boolean;
  isLoggedIn:boolean;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessages:FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        console.log(this.isLoggedIn);
        this.isLoggedIn = true;
        this.isLoggedInUser = auth.email;
        console.log(this.isLoggedIn);
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessages.show('You are now logged out',{
      cssClass:"alert-success",timeout:4000
    });
    this.router.navigate(['/login']);
  }

}
