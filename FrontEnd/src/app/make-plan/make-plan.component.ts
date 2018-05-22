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
  contents: any;
  start_date: any;
  end_date: any;
  no_companion: any;

  country_list: any;
  city_list: any;

  selected_country_no: any = null;
  selected_city_no: any;


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
        this.country_list = item;
      })
  }

  getCityList() {
    if (this.selected_country_no == null)
      alert("please select country")
    else {
      console.log("selected country no:", this.selected_country_no);
      this.http.get(`http://localhost:3000/travel/city/${this.selected_country_no}`)
        .subscribe((item: any) => {
          this.city_list = item;
        })
    }
  }

  setCity() {
    
  }

  // setRegions() {
  //   for (this.region in this.countries)
  //     document.write('<option value="' + this.region + '">' + this.region + '</option>');
  // }

  // set_country(oRegionSel, oCountrySel, oCity_StateSel) {
  //   var countryArr;
  //   oCountrySel.length = 0;
  //   oCity_StateSel.length = 0;
  //   var region = oRegionSel.options[oRegionSel.selectedIndex].text;
  //   if (this.countries[region]) {
  //     oCountrySel.disabled = false;
  //     oCity_StateSel.disabled = true;
  //     oCountrySel.options[0] = new Option('SELECT COUNTRY', '');
  //     countryArr = this.countries[region].split('|');
  //     for (var i = 0; i < countryArr.length; i++)
  //       oCountrySel.options[i + 1] = new Option(countryArr[i], countryArr[i]);
  //     document.getElementById('txtregion').innerHTML = region;
  //     document.getElementById('txtplacename').innerHTML = '';
  //   }
  //   else oCountrySel.disabled = true;
  // }

  // set_city_state(oCountrySel, oCity_StateSel) {
  //   var city_stateArr;
  //   oCity_StateSel.length = 0;
  //   var country = oCountrySel.options[oCountrySel.selectedIndex].text;
  //   if (this.city_states[country]) {
  //     oCity_StateSel.disabled = false;
  //     oCity_StateSel.options[0] = new Option('SELECT NEAREST DIVISION', '');
  //     city_stateArr = this.city_states[country].split('|');
  //     for (var i = 0; i < city_stateArr.length; i++)
  //       oCity_StateSel.options[i + 1] = new Option(city_stateArr[i], city_stateArr[i]);
  //     document.getElementById('txtplacename').innerHTML = country;
  //   }
  //   else oCity_StateSel.disabled = true;
  // }

  // print_city_state(oCountrySel, oCity_StateSel) {
  //   var country = oCountrySel.options[oCountrySel.selectedIndex].text;
  //   var city_state = oCity_StateSel.options[oCity_StateSel.selectedIndex].text;
  //   if (city_state && this.city_states[country].indexOf(city_state) != -1)
  //     document.getElementById('txtplacename').innerHTML = city_state + ', ' + country;
  //   else document.getElementById('txtplacename').innerHTML = country;
  // }

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