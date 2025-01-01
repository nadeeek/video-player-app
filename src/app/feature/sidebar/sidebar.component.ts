import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Video } from '../../shared/models/video.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatButtonModule, 
    MatIconModule, 
    FormsModule, 
    SearchBarComponent
],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() videos: Video[] = [];
  @Input() currentVideo: Video | null = null;
  @Input() isVideoPlaying: boolean = false;
  @Output() videoSelected = new EventEmitter<Video>();
  @Output() playPauseToggled = new EventEmitter<{ video: Video; event: Event }>();

  filteredVideos: Video[] = [];

  ngOnInit() {
    this.filteredVideos = this.videos;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videos']) {
      this.filteredVideos = this.videos;
    }
  }


  onSearch(query: string): void {
    if (query.trim() === '') {
      this.filteredVideos = this.videos;
    } else {
      this.filteredVideos = this.videos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  selectVideo(video: Video): void {
    this.videoSelected.emit(video);
  }

  togglePlayPause(video: Video, event: Event): void {
    event.stopPropagation();
    this.playPauseToggled.emit({ video, event });
  }

  isPlaying(video: Video): boolean {
   
      return this.currentVideo?.id === video.id && this.isVideoPlaying;
  }
}
