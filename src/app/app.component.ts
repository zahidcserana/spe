import { Component } from '@angular/core';
import { ScriptLoaderService } from './common/script-loader.service';
import { Helpers } from './common/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Pharmacy ERP';
  constructor(private _script: ScriptLoaderService) {
    this.getSettings();
  }
  getSettings() {
    // Helpers.loadStyles('head', 'assets/css/bootstrap.min.css');

    this._script.loadScripts('body', [
      // 'assets/js/bootstrap.min.js',
    ])
      .then(result => {
        // Helpers.setLoading(false);
      });
  }
}
