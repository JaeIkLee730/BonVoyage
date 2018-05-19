import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  post_lists: any;
  post_list: any ;
  constructor( private board: BoardComponent,
                private http: HttpClient ) { }

  ngOnInit() {
    this.getAllPost() ;
  }

  getAllPost() {
    this.http.get(`http://localhost:3000/board/all`)
    .subscribe( (item:any)=>{
      this.post_lists = item ;
      console.log(this.post_lists) ;
    })
  }

}
