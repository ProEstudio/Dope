// Imports dependencies ============================
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Data } from '../../model/data'
import { DataService } from '../../services/data.service'
import { EmitterService } from '../../emitter.service'

// Component decorator =============================
@Component({
	selector: 'app-home',
	templateUrl: 'build/pages/home/home.html'
})

// Component class =================================
export class HomeComponent {
	// Local properties 
	data: Data[];
	dash: boolean;
	login: boolean;
	library: boolean;
	album: boolean;

	// Input properties 
	@Input() listId: string
	@Input() editId: string

	// Constructor with injected service 
	constructor(private dataService: DataService) {}

	ngOnInit() {
		// Load data
		this.loadData()
	}

	loadData() {
		// Get all data 
		this.dataService.getData()
						.subscribe(
							data => this.data = data, //Bind to view
							err => {
								// Log errors if any
								console.log(err);
							}
						)
	}

	ngOnChanges(changes: any) {
		// Listen to the 'list'emitted event so as populate the model
        // with the event payload
		EmitterService.get(this.listId).subscribe((data: Data[]) => {this.loadData()})
	}

	openDash() {
		this.login = true
	}

	openLogin() {
		this.login = true
	}

	openDash2() {
		this.login = false
		this.dash = true
	}

	openLibrary() {
		this.library = true
	}

	openAlbum() {
		this.album = true
	}
 }