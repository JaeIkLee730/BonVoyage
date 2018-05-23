import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MemberComponent } from '../../member/member.component';


@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {

  name: any ;
  id: any ;
  pwd: any ;
  pwd_check: any ;
  age: any ;
  gender: any ;
  birth: any ;
  email: any ;
  phone: any ;
  
  curr_user: any = null ;
  ifNew: boolean = true ;

  constructor( private http: HttpClient,
                private router: Router,
                private member: MemberComponent ) { }

  ngOnInit() {
    this.curr_user = this.member.getCurrentUser() ;
    if( this.curr_user!=null ){
      this.name = this.curr_user.name ;
      this.id = this.curr_user.id ;
      this.age = this.curr_user.age ;
      this.gender = this.curr_user.gender ;
      this.birth = this.curr_user.birth ;
      this.email = this.curr_user.email ;
      this.phone = this.curr_user.phone ;
      this.ifNew = false ;
    }
  }

  redundancyCheck(id:any) {
    this.id = id ;

    let body = {
      id: id
    }
    // id too short or long
    if( this.id==undefined || (this.id.length)<4 ){
      alert("User ID must have at least 4 characters.") ;
    } else if( (this.id.length)>30 ) {
      alert("User ID must be less than 30 characters.") ;
    } else {
      this.http.post(`http://localhost:3000/members/redundancy`, body)
      .subscribe( (item:any)=> {
        if( item.id==undefined ){
          console.log( "matching id not exist" ) ;
          alert("ID available") ;
        } else {
          console.log( item.id ) ;
          alert("The ID already exist") ;
        }
      })
    }
  }

  idCheck( id:any ) {
    if( (id==undefined) || (id.length)<4 ){
      alert("User ID must have at least 4 characters.") ;
      console.log("1");
    } else if( (id.length)>30 ){
      alert("User ID must be less than 30 characters.") ;
    } else if( this.ifNew ) {
      let body = {
        id: id,
      }
      this.http.post(`http://localhost:3000/members/redundancy`, body)
      .subscribe( (item:any)=> {
        if( item.id==undefined ){
          // name check
          this.nameCheck(this.name) ;
        } else {
          alert("The ID already exist") ;
        }
      })
    } else {
      this.nameCheck(this.name) ;
    }
  }

  nameCheck( name:any ){
    if( name==undefined || name.length<1 ) {
      alert("You haven't entered a name.") ;
    } else {
      // pwd check
      this.pwdCheck(this.pwd, this.pwd_check) ;
    }
  }

  pwdCheck(pwd:any, pwd_check:any) {
    if( pwd==undefined || pwd.length<4 ){
      alert("Password must have at least 4 characters.") ;
    } else if( pwd.length>30 ) {
      alert("User ID must be less than 30 characters.") ;
    } else if( pwd!=pwd_check ) {
      alert("Check if the passwords matches.") ;
    } else if( this.ifNew ){
      console.log("done") ;
      alert(this.name + "(" + this.id + "), " + "Welcome to Bon Voyage!!") ;
      this.acceptMember( this.name, this.id, this.pwd ) ;
    } else {
      this.modifyMemberInfo( this.name, this.id, this.pwd ) ;
      alert("Your information is succesfully modified!") ;
    }
  }

  acceptMember( name:any, id:any, pwd:any ) {
    let body = {
      name: name,
      id: id,
      pwd: pwd,
      age: this.age,
      gender: this.gender,
      birth: this.birth,
      phone: this.phone,
      email: this.email
    }
    this.http.post(`http://localhost:3000/members/join/`, body)
    .subscribe( (item:any)=> {
      this.router.navigate(['main']) ;
    })
  }

  modifyMemberInfo( name:any, id:any, pwd:any ) {
    let body = {
      name: name,
      id: id,
      pwd: pwd,
      age: this.age,
      gender: this.gender,
      birth: this.birth,
      phone: this.phone,
      email: this.email
    }
    this.http.post(`http://localhost:3000/members/modify/${this.curr_user.user_no}`, body)
    .subscribe( (item:any)=> {
      localStorage.clear() ;
      this.member.setCurrentUser( item ) ;
      this.router.navigate(['main']) ;
    })
  }

  join(name:any, id:any, pwd:any, pwd_check:any) {
    this.name = name ;
    this.id = id ;
    this.pwd = pwd ;
    this.pwd_check = pwd_check ;
    
    this.idCheck(id) ;
    
    // because it's asynchronous ;
  }
}
