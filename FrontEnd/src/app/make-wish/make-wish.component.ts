import { Component, OnInit } from '@angular/core';
import { MemberComponent } from '../member/member.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-make-wish',
  templateUrl: './make-wish.component.html',
  styleUrls: ['./make-wish.component.css']
})
export class MakeWishComponent implements OnInit {

  curr_user: any;
  travel_no: any;
  selected_city_no: any = null ;
  start_date: any ;
  end_date: any ;
  category_no: any ;
  cost: number = 0 ;
  title: any ;
  description: any ;

  current_travel_no: any;
  start_no: number = 0 ;
  display_no: number = 1000 ;

  travel_list: any;
  country_list: any ;
  city_list: any ;
  category_list: any ;


  selected_country_no: any = null ;
  selected_country_name: any  ;
  selected_city_name: any ;

  citySelectCompleted: boolean = false ;

  constructor(private member: MemberComponent,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.curr_user = this.member.getCurrentUser();
    this.getTravel() ;
    this.getCountryList();
    this.getCategory() ;
    console.log("travel_lit:",this.travel_list) ;
  }

  getCountryList() {
    this.http.get(`http://localhost:3000/travel/country`)
    .subscribe((item: any) => {
      this.country_list = item;
    })
  }
  
  getCityList() {
    this.http.get(`http://localhost:3000/travel/city/${this.selected_country_no}`)
      .subscribe((item: any) => {
        this.city_list = item;
      })
  }

  setCity() {
    if( this.selected_city_no!=null ) {
      this.citySelectCompleted = true ;
      this.http.get(`http://localhost:3000/travel/setInOutCity/${this.selected_city_no}/${this.selected_city_no}`)
                    .subscribe((item: any) => {
        this.selected_country_name = item.in_country[0].name ;
        this.selected_city_name = item.in_city[0].name ;
      })
    }
  }
  
  getCategory() {
    this.http.get(`http://localhost:3000/travel/category`)
    .subscribe((item: any) => {
      this.category_list = item;
    })
  }

  getTravel() {
    this.http
      .get(`http://localhost:3000/travel/user_travel/`
        + `${this.curr_user.user_no}/`
        + `${this.start_no}/`
        + `${this.display_no}`)
      .subscribe((item: any) => {
        // this.current_post = null ;
        this.travel_list = item.travel_list;
      })
  }

  saveWish() {
    try {
      // it not logined yet, throw error
      this.curr_user = this.member.getCurrentUser();

      let body = {
        user_no: this.curr_user.user_no,
        travel_no: this.travel_no,
        city_no: this.selected_city_no,
        start_date: this.start_date,
        end_date: this.end_date,
        category_no: this.category_no,
        cost: this.cost,
        title: this.title,
        description: this.description,        
      }

      this.http.post(`http://localhost:3000/travel/saveWish/`, body)
        .subscribe((item: any) => {
          alert("Successfully posted");
          this.description = '';
          this.title = '';
          this.router.navigate(['main', 'myPage']);
        })
    } catch (e) {
      alert("please login to write");
    }
  }

}
