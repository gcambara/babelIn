import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};
  showUser: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
   ) {}

  ionViewDidLoad(){
    console.log('ionViewDidLoad HomePage');
  }
}
