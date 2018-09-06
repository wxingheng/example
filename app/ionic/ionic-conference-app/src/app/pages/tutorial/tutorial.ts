import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, Slides } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialPage {
  showSkip = true;

  // TODO https://github.com/ionic-team/ionic/issues/15046
  @ViewChild('slides') slides: Slides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {}

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/(schedule:schedule)')
      .then(() => this.storage.set('ion_did_tutorial', 'true'));
  }

  onSlideChangeStart(event) {
    this.showSkip = !event.target.isEnd();
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res) {
        this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
      }
    });

    this.menu.enable(false);
  }

  ionViewDidEnter() {
    this.slides.update();
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
