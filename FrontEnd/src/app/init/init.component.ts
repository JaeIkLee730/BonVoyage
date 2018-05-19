import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { HttpClient } from '@angular/common/http' ;
import { MemberComponent } from '../member/member.component';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  name: any ;
  login_id: any ;
  login_pwd: any ;

  constructor( private member: MemberComponent,
                private router: Router, 
                private http: HttpClient ) { }

  ngOnInit() {
  }

  login( idInput, pwdInput ) {
    this.member.login(idInput, pwdInput);
  }

  join() {
    this.router.navigate(['join']) ;
  }

}
