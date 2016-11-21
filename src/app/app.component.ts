import {Component} from '@angular/core';

@Component({
	selector: 'app',
	templateUrl: 'build/app.component.html'
})

export class AppComponent {
	read: boolean;

	openDash() {
		this.read = true
	}
 }