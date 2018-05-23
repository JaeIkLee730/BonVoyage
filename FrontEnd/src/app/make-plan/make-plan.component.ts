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

  curr_user: any = null;

  title: any;
  description: any ;
  start_date: any;
  end_date: any;
  no_companion: any;

  in_country_list: any ;
  out_country_list: any ;
  in_city_list: any ;
  out_city_list: any ;

  selected_in_country_no: any = null ;
  selected_in_city_no: any = null ;

  selected_out_country_no: any = null ;
  selected_out_city_no: any = null;

  selected_in_country_name: any ;
  selected_in_city_name: any  ;

  selected_out_country_name: any ;
  selected_out_city_name: any ;

  citySelectCompleted: boolean = false ;


  constructor(private member: MemberComponent,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.curr_user = this.member.getCurrentUser();
    this.getCountryList();
  }

  getCountryList() {
    this.http.get(`http://localhost:3000/travel/country`)
    .subscribe((item: any) => {
      this.in_country_list = item;
      this.out_country_list = item;
    })
  }
  
  getCityList(selected_country_no, se) {
    this.http.get(`http://localhost:3000/travel/city/${selected_country_no}`)
      .subscribe((item: any) => {
        if( se==0 )
          this.in_city_list = item;
        else if ( se==1 ) 
          this.out_city_list = item;
      })
  }

  getInCityList() {
    if (this.selected_in_country_no == null)
      alert("please select country")
    else {
      this.getCityList(this.selected_in_country_no, 0);
    }
  }

  getOutCityList() {
    if (this.selected_out_country_no == null)
      alert("please select country")
    else {
      this.getCityList(this.selected_out_country_no, 1);
    }
  }

  setInOutCity() {

    if( this.selected_in_city_no!=null
        && this.selected_out_city_no!=null) {
      
      this.citySelectCompleted = true ;

      this.http.get(`http://localhost:3000/travel/setInOutCity/${this.selected_in_city_no}/${this.selected_out_city_no}`)
                    .subscribe((item: any) => {
        this.selected_in_country_name = item.in_country[0].name ;
        this.selected_in_city_name = item.in_city[0].name ;
        this.selected_out_country_name = item.out_country[0].name ;
        this.selected_out_city_name = item.out_city[0].name ;
      })
    }
  }

  saveTravel() {
    try {
      // it not logined yet, throw error
      this.curr_user = this.member.getCurrentUser();

      let body = {
        user_no: this.curr_user.user_no,
        title: this.title,
        description: this.description,
        start_date: this.start_date,
        end_date: this.end_date,
        no_companion: this.no_companion,
        in_city_no: this.selected_in_city_no,
        out_city_no: this.selected_out_city_no
      }

      this.http.post(`http://localhost:3000/travel/saveTravel/`, body)
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

  toMakeWish() {
    this.saveTravel() ;
    this.router.navigate(['main', 'makeWish']);
  }

}