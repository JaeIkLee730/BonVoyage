import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MemberComponent } from '../member/member.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-identify',
  templateUrl: './member-identify.component.html',
  styleUrls: ['./member-identify.component.css']
})
export class MemberIdentifyComponent implements OnInit, OnDestroy {

  private sub: any ;

  identify_type: any ;
  curr_user: any ;
  pwd_check: any ;

  constructor( private member: MemberComponent,
                private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient ) { }

  ngOnInit() {
    this.curr_user = this.member.getCurrentUser() ;
    this.sub = this.route
    .queryParams
    .subscribe( params => {
      // Defaults to 0 if no query param provided.
      this.identify_type = params['identify_type'] || 0 ;
    });
    console.log("identify_type",this.identify_type) ;
  }

  ngOnDestroy() {
    console.log("board : ngOnDestroy()") ;
    this.sub.unsubscribe();
  }

  identify() {
    try {
      this.curr_user = this.member.getCurrentUser() ;
      console.log("identify_type",this.identify_type) ;

      if( this.curr_user.pwd==this.pwd_check ){
        switch( this.identify_type ) {
          case '0': {
            console.log("identify_type : 0") ;
            this.withdrawal() ;
            break ;
          }
          case '1': {
            console.log("identify_type : 1") ;
            this.router.navigate(['join','memberInfo']) ;
            break ;
          }
          default: {
            console.log("identify_type : default") ;
            console.log("error") ;
            break ;
          }
        }
      } else {
        alert("Wrong Password.") ;
      }

    } catch(e) {
      alert("You are a visitor. Log in please.") ;
    }

  }

  withdrawal() {
    try{
      this.curr_user = this.member.getCurrentUser() ;

      this.member.deleteMember( this.curr_user ) ;

    } catch(e) {
      alert("You are a visitor. Log in please.") ;
    }
  }

}
