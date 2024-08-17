import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'app-metadata-display',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './metadata-display.component.html',
  styleUrl: './metadata-display.component.scss'
})
export class MetadataDisplayComponent {

  metadataService: MetadataService = inject(MetadataService);

  onKeyup(field: string, event: any): void {
    const value = event.target.value;
    switch (field) {
      case "title":
        this.metadataService.displayedMetadata.tempTitle = value
        this.metadataService.displayedMetadata.dirty = true;
        break;
      case "artist":
        this.metadataService.displayedMetadata.tempArtist = value
        this.metadataService.displayedMetadata.dirty = true;
        break;
      case "album":
        this.metadataService.displayedMetadata.tempAlbum = value
        this.metadataService.displayedMetadata.dirty = true;
        break;
      case "filename":
        this.metadataService.displayedMetadata.tempFilename = value
        this.metadataService.displayedMetadata.dirty = true;
        break;
    }
  }
}
