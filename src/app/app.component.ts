import { Component } from '@angular/core';
import { ScriptLoaderService } from './common/script-loader.service';
import { Helpers } from './common/helpers';
import { ShortcutInput, ShortcutEventOutput } from 'ng-keyboard-shortcuts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Pharmacy ERP';
  constructor(
    private _script: ScriptLoaderService,
    private router: Router
    ) {
    this.getSettings();
  }
  shortcuts: ShortcutInput[] = [];
  ngAfterViewInit() {
    this.shortcuts.push(
      {
        key: ["?"],
        label: "Help",
        description: "Question mark",
        command: e => console.log("question mark clicked", { e }),
        preventDefault: true
      },
      {
        key: ["Shift + d"],
        label: "Sale",
        description: "Shift + d",
        command: (output: ShortcutEventOutput) =>
        this.router.navigate(['/'])
      },
      {
        key: ["Shift + s"],
        label: "Sale",
        description: "Shift + s",
        command: (output: ShortcutEventOutput) =>
        this.router.navigate(['/sale'])
      },
      {
        key: ["Shift + p"],
        label: "Purchase",
        description: "Shift + p",
        command: (output: ShortcutEventOutput) =>
        this.router.navigate(['/purchase'])
      }
    );
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
