import { Component, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberComponent } from '../member/member.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  private sub: any ;

  post_page_no: number = 1 ;
  post_cnt: number ;

  // how many post would be shown
  start_no: number = 0 ;
  display_no: number = 5 ;

  user_written_title: any ;
  user_written_text: any ;

  current_board_no: any;
  boardSel: any ;
  current_post: any;
  curr_user: any ;
  writing: boolean ;
  modifying: boolean ;

  post_list: any ;
  type: any ;
  keyword: any = '' ;  

  modifyingPost_no: any ;

  constructor( private route: ActivatedRoute, 
                private router: Router,
                private http: HttpClient, 
                private member: MemberComponent ) { console.log("constructor in board"); }

  ngOnInit() {
    this.getCurrentBoardNum() ;
    this.getPost() ;
    this.getPostCnt() ;
    
    this.writing = false ;
    this.modifying = false ;
    this.current_post = null ;
    this.type = '0' ;
    // 0!='0'

    this.curr_user = this.member.getCurrentUser() ;
  }

  ngOnDestroy() {
    console.log("board : ngOnDestroy()") ;
    this.sub.unsubscribe();
  }

  getCurrentBoardNum() {
    // gettting current board number
    this.sub = this.route
    .queryParams
    .subscribe( params => {
      // Defaults to 0 if no query param provided.
      this.current_board_no = params['board_no'] || 0 ;
    });
    return this.current_board_no ;
  }

  getPost() {
    if( this.current_board_no==0 ) {
      this.router.navigate(['main'])
    } else {
      console.log("current_board_no", this.current_board_no) ;
      this.http
      .get(`http://localhost:3000/board/`
            + `${this.current_board_no}/`
            + `${this.start_no}/`
            + `${this.display_no}`)
      .subscribe( (item:any)=> {
        this.current_post = null ;
        this.post_list = item.post_list ;
        return this.post_list ;
      })
    }
  }

  getPostCnt() {
    if( this.current_board_no!=0 ) {
      this.http
      .get(`http://localhost:3000/board/`
            + `${this.current_board_no}/`
            + `${this.start_no}/`
            + `${this.display_no}`)
      .subscribe( (item:any)=> {
        this.current_post = null ;
        this.post_cnt = item.post_cnt[0].post_cnt ;
      })
    }
  }

  toNextPostPage() {
    this.getPostCnt() ;
    if( (this.post_page_no)*(this.display_no)<this.post_cnt ) {
      this.start_no+=this.display_no ;
      this.post_page_no += 1 ;
      this.getPost() ;
    } else {
      alert("Last page of the board.") ;
    }
  }

  toPrevPostPage() {
    if( this.start_no>0 ){
      this.start_no-=this.display_no ;
      this.post_page_no-=1 ;
      this.getPost() ;
    }
  }

  search() {

    let body = {
      post_title: this.keyword,
      user_id: this.keyword
    }

    this.http.post(`http://localhost:3000/board/search/${this.current_board_no}`, body)
    .subscribe( (item:any)=> {

      console.log("byTitle: ", item.byTitle) ;
      console.log("byUser: ", item.byUser) ;
      console.log("type: ", this.type) ;
      
      switch(this.type) {
        case '0': {
          this.post_list = item.byTitle ;
          this.keyword = '' ;
          break ;
        }
        case '1': {
          this.post_list = item.byUser ;
          this.keyword = '' ;
          break ;
        }
        default: {
          this.keyword = '' ;
          break ;
        }
      }
    })
  }

  toPost( post:any ) {
    this.current_post = post ;
  }

  write() {
    try {
      console.log("get current usr : ", this.member.getCurrentUser() ) ;
      this.curr_user = this.member.getCurrentUser() ;

      this.boardSel = this.current_board_no ;
      this.current_post = null ;
      this.writing = true ;

    } catch(e) {
      alert("please login to write");
    }

  }

  post() {
    try {
      this.curr_user = this.member.getCurrentUser() ;

      let body = {
        user_id : this.curr_user.id,
        post_title : this.user_written_title,
        post_contents : this.user_written_text,
      }

      this.http.post(`http://localhost:3000/board/post/${this.boardSel}`, body)
      .subscribe( (item:any)=>{
        alert("Successfully posted") ;
        this.writing = false ;
        this.user_written_title = '' ;
        this.user_written_text = '';
        this.router.navigate(['main','board']) ;
        this.getPost() ;
      })
    } catch(e) {
      alert("please login to write");
    }
  }

  ifMyPost( user_id: any ) {
    if( this.curr_user==undefined ){
      return false ;
    } else if ( this.curr_user==null ){
      return false ;
    } else if( this.curr_user.id==user_id ) {
      return true ;
    } else {
      return false ;
    }
  }

  modify( post:any ) {
    try {
      this.curr_user = this.member.getCurrentUser() ;

      this.modifyingPost_no = post.post_no ;
      this.writing = true ;
      this.modifying = true ;
      this.current_post = null ;

      this.user_written_title = post.post_title ;
      this.user_written_text = post.post_contents ;

    } catch(e) {
      alert("please login to write");
    }
  }

  postModified() {

    let body = {
      post_title : this.user_written_title,
      post_contents : this.user_written_text,
      post_no: this.modifyingPost_no
    }

    this.http.put(`http://localhost:3000/board/${this.current_board_no}`, body)
    .subscribe( (item:any)=>{
      console.log(item) ;
      this.modifyingPost_no = null ;
      this.writing = false ;
      this.modifying = false ;
      this.getPost() ;
    })

  }

  delete( post_no ) {

    this.http.delete(`http://localhost:3000/board/${this.current_board_no}/${post_no}`)
    .subscribe( (item:any)=>{
      this.getPost() ;
    })  
  }
}
