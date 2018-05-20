import { Component, OnInit } from '@angular/core';
import { MemberComponent } from '../member/member.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-make-plan',
  templateUrl: './make-plan.component.html',
  styleUrls: ['./make-plan.component.css']
})
export class MakePlanComponent implements OnInit {

  curr_user: any = null ;
  title: any ;
  contents: any ;
  start_date: any ;
  end_date: any ;
  no_companion: any ;

  constructor( private member: MemberComponent,
                private route: ActivatedRoute, 
                private router: Router,
                private http: HttpClient ) { }

  ngOnInit() {
    this.curr_user = this.member.getCurrentUser() ;
  }
  
  // post() {
  //   try {
  //     this.curr_user = this.member.getCurrentUser() ;

  //     let body = {
  //       user_no : this.curr_user.user_no,
  //       title : this.title,
  //       start_date : this.start_date,
  //       end_date: this.end_date,
  //       no_companion: this.no_companion 
  //     }

  //     this.http.post(`http://localhost:3000/board/post/${this.boardSel}`, body)
  //     .subscribe( (item:any)=>{
  //       alert("Successfully posted") ;
  //       this.writing = false ;
  //       this.user_written_title = '' ;
  //       this.user_written_text = '';
  //       this.router.navigate(['main','board']) ;
  //       this.getPost() ;
  //     })
  //   } catch(e) {
  //     alert("please login to write");
  //   }
  // }
}