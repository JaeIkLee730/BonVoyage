import { BrowserModule } from '@angular/platform-browser' ;
import { NgModule } from '@angular/core' ;
import { Routes, RouterModule } from '@angular/router' ;
import { HttpClientModule } from '@angular/common/http' ;
import { FormsModule } from '@angular/forms' ;


import { AppComponent } from './app.component' ;
import { InitComponent } from './init/init.component' ;
import { MainComponent } from './main/main.component' ;

import { JoinComponent } from './join/join.component' ;
import { TermsComponent } from './join/terms/terms.component';
import { MemberInfoComponent } from './join/member-info/member-info.component';
import { MemberIdentifyComponent } from './member-identify/member-identify.component';
import { MemberComponent } from './member/member.component';
import { MyPageComponent } from './my-page/my-page.component';
import { MakePlanComponent } from './make-plan/make-plan.component';

import { BoardComponent } from './board/board.component';
import { NewPostComponent } from './new-post/new-post.component';

import { HttpService } from '../services/http.service';
import { HttpModule } from '@angular/http';

const appRoutes:Routes = [
  {
    path: '' ,
    component: InitComponent
  },
  {
    path: 'join' ,
    component: JoinComponent,
    children: [
      {
        path: '',
        component: TermsComponent
      },
      {
        path: 'memberInfo',
        component: MemberInfoComponent
      }
    ]
  },
  {
    path: 'main' ,
    component: MainComponent,
    children: [
      {
        path: '',
        component: NewPostComponent
      },
      {
        path: 'board',
        component: BoardComponent 
      },
      {
        path: 'memberIdentify',
        component: MemberIdentifyComponent
      },
      {
        path: 'myPage',
        component: MyPageComponent
      },
      {
        path: 'makePlan',
        component: MakePlanComponent
      }
    ]
  },

]

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    JoinComponent,
    MainComponent,
    BoardComponent,
    NewPostComponent,
    TermsComponent,
    MemberInfoComponent,
    MemberComponent,
    MemberIdentifyComponent,
    MyPageComponent,
    MakePlanComponent,
  ],
  imports: [
    HttpModule,
    HttpClientModule, // for server
    FormsModule,      // for server
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ 
    HttpService,
    MemberComponent,
    BoardComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
