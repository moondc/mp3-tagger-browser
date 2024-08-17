import { Injectable, inject } from '@angular/core';
import { Id3Service, MetadataStore } from './id3.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private id3Service: Id3Service = inject(Id3Service);
  public metadataStore: MetadataStore[] = [];
  public displayedMetadata!: MetadataStore;

  constructor() {
    this.resetDisplayed();
  }

  public displayMetadata(metadata: MetadataStore): void {
    this.displayedMetadata = metadata;
  }

  public resetDisplayed() {
    this.displayedMetadata = {
      currentAlbum: '', currentArtist: '', currentFilename: '', currentTitle: '',
      tempAlbum: '', tempArtist: '', tempFilename: '', tempTitle: '', dirty: false,
    };
  }

  public async addMetadataToStore(file: File): Promise<void> {
    if (this.metadataStore.some(metadata => metadata.currentFilename === file.name)) {
      return;
    }
    const metadata = await this.id3Service.generateMetadata(file);
    this.metadataStore.push(metadata);
  }
}