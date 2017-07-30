import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { SignupPage } from '../pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   charities: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public db: AngularFireDatabase){
    //this.charities = db.list('/charities');
    //localStorage.setItem('charities',JSON.stringify(this.charities));
    //console.log(this.charities);

    this.charities = db.list('/charities', { preserveSnapshot: true });
    this.charities
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
        });
      })
  }

  ionViewCanEnter(){
   
  }
}
