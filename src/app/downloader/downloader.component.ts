import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MetadataService } from '../metadata.service';
import { Id3Service, MetadataStore } from '../id3.service';

@Component({
  selector: 'app-downloader',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './downloader.component.html',
  styleUrl: './downloader.component.scss'
})
export class DownloaderComponent {
  metadataService: MetadataService = inject(MetadataService);
  id3Service: Id3Service = inject(Id3Service);

  isDownloadCurrentDisabled() {
    return this.metadataService.displayedMetadata.currentFilename === '';
  }

  isDownloadAllDisabled() {
    const metadataStoreHasDirty = this.metadataService.metadataStore.some(a => a.dirty === true)
    const metadataStoreIsEmpty = this.metadataService.metadataStore.length === 0
    return metadataStoreIsEmpty || !metadataStoreHasDirty;
  }

  async downloadCurrent() {
    const current = this.metadataService.displayedMetadata;
    await this.downloadAFile(current);
  }

  downloadAllChanged() {
    const dirtyMpegs = this.metadataService.metadataStore.filter(x => x.dirty === true);
    for (let i = 0; i < dirtyMpegs.length; i++) {
      this.downloadAFile(dirtyMpegs[i]);
    }
  }

  async downloadAFile(metadata: MetadataStore) {
    const buffer = await this.id3Service.writeMetadata(metadata);
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = metadata.tempFilename;
    link.click();
    link.remove();
    metadata.currentAlbum = metadata.tempAlbum;
    metadata.currentTitle = metadata.tempTitle;
    metadata.currentArtist = metadata.tempArtist;
    metadata.currentFilename = metadata.tempFilename;
    metadata.dirty = false;
  }
}
