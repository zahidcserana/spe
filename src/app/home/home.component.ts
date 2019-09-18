import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../common/script-loader.service';
import { Helpers } from '../common/helpers';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _script: ScriptLoaderService) {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('myDiv').style.display = 'none';
    this.getSettings();
  }

  ngOnInit() {
    setTimeout(this.showPage, 3000);
  }

  showPage() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('myDiv').style.display = 'block';
  }
  getSettings() {
    Helpers.loadStyles('head', 'assets/css/bootstrap.min.css');
    Helpers.loadStyles('head', 'assets/css/custom.css');

    this._script.loadScripts('body', [
      'assets/js/main.js',
    ])
      .then(result => {
        // Helpers.setLoading(false);
      });
  }
}
