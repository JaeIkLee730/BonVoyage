import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  term_1_accept: boolean = true ;
  term_2_accept: boolean = true ;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  toMemberInfoPage() {
    console.log( this.term_1_accept, this.term_2_accept ) ;
    if( this.term_1_accept==true && this.term_2_accept==true ){
      this.router.navigate(['join', 'memberInfo']) ;
    } else {
      alert("You have to accept all terms") ;
    }
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
