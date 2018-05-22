import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { HttpClient } from '@angular/common/http';
import { MemberComponent } from '../member/member.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  login_id: any ;
  login_pwd: any ;
  userName: any = null ;
  userId: any = null ;
  curr_user: any
  num_members: any = {
    cnt:0
  };

  constructor( private member: MemberComponent,
                private router: Router, 
                private http: HttpClient ) { }

  ngOnInit() {
    this.numMembers();
    if ( this.curr_user = this.member.getCurrentUser() ){
      this.userName = this.curr_user.name;
      this.userId = this.curr_user.id ;
    }
  }

  getBoard( board_no ) {
    console.log("board number",board_no) ;
    // passing board number as a paramerter.
    this.router.navigate(['main', 'board'], { queryParams: { board_no: board_no } }) ;
    window.location.reload();
  }

  toMain() {
    this.router.navigate(['main',]) ;
    // blnak - connect to path:''
  }

  toIdentifyPage( identify_type ) {
    try {
      this.curr_user = this.member.getCurrentUser() ;
      this.router.navigate(['main', 'memberIdentify'], { queryParams: { identify_type: identify_type } }) ;
    } catch(e) {
      alert("You are a visitor. Log in please.") ;
    }
  }

  toMyPage() {
    this.router.navigate(['main','myPage']) ;
  }

  toTravel() {
    this.router.navigate(['main','makePlan']) ;
  }

  numMembers() {
    this.http.get(`http://localhost:3000/members`)
    .subscribe( (item:any)=> {
      this.num_members = item[0].cnt ;
      console.log("num: ",this.num_members) ;
      console.log("item: ",item) ;
    })
  }

  logout() {
    this.member.logout();
    this.userName='' ;
    window.location.reload();
  }

  login() {
    this.member.login(this.login_id, this.login_pwd);
    this.login_id = '' ;
    this.login_pwd = '' ;
    window.location.reload();
  }

  join() {
    this.router.navigate(['join']) ;
  }

  // identify_type==0 : withdrawal
  // identify_type==1 : modification


}
