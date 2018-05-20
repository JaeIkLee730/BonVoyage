import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { HttpClient } from '@angular/common/http' ;

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  curr_user: any ;
  user_no: any ;
  name: any ;
  id: any ;
  pwd: any ;
  age: any ;
  gender: any ;
  email: any ;
  birth: any ;
  phone: any ;

  
  constructor( private router: Router, private http: HttpClient ) { }

  ngOnInit() {
  }

  login( idInput, pwdInput ) {
    let body = {
      id: idInput ,
      pwd: pwdInput
    }

    this.http.post ( `http://localhost:3000/members/login`, body )
    .subscribe( (item:any)=> {
      this.name = item.name ;
      this.user_no = item.user_no ; 
      this.age = item.age ;
      this.gender = item.gender ;
      this.email = item.email ; 
      this.birth = item.birth ;
      this.phone = item.phone ;

      this.setCurrentUser(item) ;
      this.router.navigate(['main']) ;  
    }, error => {
      console.log('fail') ;
      alert("Nonexistent member or wrong password.") ;
    })
  }

  logout() {
    localStorage.clear();
  }

  setCurrentUser( item: any ) {
    let currentUserInfo = {
      token: item
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUserInfo) );
    // localStorage : angular framework에서 기본 제공
    // lib.dom.d.ts에 정의되어 있는 글로벌 변수
  }

  getCurrentUser() {
      var currentUser ;
      if ( currentUser = JSON.parse(localStorage.getItem('currentUser')) ){
        var token = currentUser.token; // your token
        this.curr_user = token ;
        return this.curr_user ;
      } else {
        console.log("Current user not exist.") ;
      }
  }

  deleteMember( user:any ) {
    try{
      this.curr_user = this.getCurrentUser() ;

      if( user.user_no==this.curr_user.user_no ) {
        console.log("match") ;
        this.http.delete(`http://localhost:3000/members/${user.user_no}`)
        .subscribe( (item:any)=>{
          localStorage.clear() ;
          this.curr_user = null ;
          alert("You have successfully left.") ;
          this.router.navigate(['main']) ;
          window.location.reload() ;
        })
      } else {
        alert("User information doesn't match.") ;
      }

    } catch(e) {
      alert("You are a visitor. Log in please.") ;
    }
  }
  
}
