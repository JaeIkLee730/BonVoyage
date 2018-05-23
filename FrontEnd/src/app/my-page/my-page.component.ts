import { Component, OnInit } from '@angular/core';
import { MemberComponent } from '../member/member.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

  curr_user: any = null ;
  travel_list: any ;
  wish_list: any ;
  current_travel_no: any ;
  start_no: number = 0 ;
  display_no: number = 5 ;

  constructor( private member: MemberComponent,
                private route: ActivatedRoute, 
                private router: Router,
                private http: HttpClient ) { }

  ngOnInit() {
    this.curr_user = this.member.getCurrentUser() ;
    this.getTravel() ;
  }

  getTravel() {
    if( this.current_travel_no==0 ) {
      this.router.navigate(['main'])
    } else {
      // console.log("current_travel_no", this.current_travel_no) ;
      this.http
      .get(`http://localhost:3000/travel/user_travel/`
            + `${this.curr_user.user_no}/`
            + `${this.start_no}/`
            + `${this.display_no}`)
      .subscribe( (item:any)=> {
        // this.current_post = null ;
        this.travel_list = item.travel_list ;
        console.log("travel list:", this.travel_list) ;
        return this.travel_list ;
      })
    }
  }

  getWishes( travel_no: any ) {
    console.log("travel_no: ", travel_no) ;
    if( this.current_travel_no==0 ) {
      this.router.navigate(['main'])
    } else {
      this.http
      .get(`http://localhost:3000/travel/user_wish/`
            + `${this.curr_user.user_no}/`
            + `${travel_no}/`
            + `${this.start_no}/`
            + `${this.display_no}`)
      .subscribe( (item:any)=> {
        // this.current_post = null ;
        this.wish_list = item.wish_list ;
        console.log("travel list:", this.wish_list) ;
        return this.wish_list ;
      })
    }
  }

}
