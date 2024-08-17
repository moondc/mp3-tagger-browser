import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MetadataService } from '../metadata.service';
import { CommonModule } from '@angular/common';
import { MetadataStore } from '../id3.service';

@Component({
  selector: 'app-file-selector',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-selector.component.html',
  styleUrl: './file-selector.component.scss'
})
export class FileSelectorComponent {
  metadataService: MetadataService = inject(MetadataService);

  async onInput(event: Event): Promise<void> {
    const inputElement = event.target as HTMLInputElement;
    let files = inputElement.files;
    for (let i = 0; i < files!.length; i++) {
      if (!this.isFileInFilelist(files![i]))
        await this.metadataService.addMetadataToStore(files![i]);
    }
    // Must reset inputs value otherwise selecting the same files will not trigger the event
    (document.getElementById('filedrop')! as HTMLInputElement).value = '';
  }

  onIconClick(event: Event, fileToRemove: MetadataStore): void {
    const index = this.metadataService.metadataStore.findIndex((file: MetadataStore) => file.currentFilename === fileToRemove.currentFilename);
    const displayedIndex = this.metadataService.metadataStore.findIndex((file: MetadataStore) => file.currentFilename === this.metadataService.displayedMetadata.currentFilename);
    if (index === displayedIndex) {
      this.metadataService.resetDisplayed();
    }
    this.metadataService.metadataStore.splice(index, 1);
    event.stopPropagation();
  }

  onSortClick(): void {
    this.metadataService.metadataStore = this.metadataService.metadataStore.sort((a: MetadataStore, b: MetadataStore) => {
      if (a.currentFilename > b.currentFilename) return 1;
      if (a.currentFilename === b.currentFilename) return 0;
      return -1;
    })
  }

  isFileInFilelist(file: File): boolean {
    if (this.metadataService.metadataStore.some(f => f.currentFilename === file.name))
      return true;
    return false;
  }

  onListItemClick(metadata: MetadataStore): void {
    this.metadataService.displayMetadata(metadata);
  }

  getIsButtonDisabled() {
    return this.metadataService.metadataStore.length === 0;
  }

  onClearListClick() {
    this.metadataService.resetDisplayed();
    this.metadataService.metadataStore = [];
  }
}
