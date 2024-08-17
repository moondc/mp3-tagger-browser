import { Injectable } from '@angular/core';
import MP3Tag, { MP3Buffer } from 'mp3tag.js';

export interface MetadataStore {
  currentTitle: string,
  currentAlbum: string,
  currentArtist: string,
  currentFilename: string,
  tempTitle: string,
  tempAlbum: string,
  tempArtist: string,
  tempFilename: string,
  mp3Buffer?: MP3Tag,
  dirty: boolean,
  file?: File
}

@Injectable({
  providedIn: 'root'
})
export class Id3Service {

  async generateMetadata(file: File): Promise<MetadataStore> {
    const buffer = this.fileToBuffer(file);
    const mp3tag = new MP3Tag(await buffer);
    const tags = mp3tag.read();
    const result: MetadataStore = {
      currentAlbum: tags.album,
      currentTitle: tags.title,
      currentArtist: tags.artist,
      currentFilename: file.name,
      tempAlbum: tags.album,
      tempArtist: tags.artist,
      tempTitle: tags.title,
      tempFilename: file.name,
      mp3Buffer: mp3tag,
      dirty: false,
      file: file
    }
    return result;
  }

  async writeMetadata(metadata: MetadataStore): Promise<MP3Buffer> {
    const mp3tag = metadata.mp3Buffer!.tags
    if (metadata.currentAlbum !== metadata.tempAlbum)
      mp3tag.album = metadata.tempAlbum
    if (metadata.currentArtist !== metadata.tempArtist)
      mp3tag.artist = metadata.tempArtist
    if (metadata.currentTitle !== metadata.tempTitle)
      mp3tag.title = metadata.tempTitle
    return metadata.mp3Buffer!.save();
  }

  private fileToBuffer(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        } else {
          reject(new Error("File could not be read"));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
