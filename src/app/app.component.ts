import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { MetadataDisplayComponent } from './metadata-display/metadata-display.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileSelectorComponent, MetadataDisplayComponent, DownloaderComponent, MatSidenavModule, DisclaimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
