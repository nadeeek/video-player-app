import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllVideos, selectCurrentVideoId } from '../../store/video.selectors';
import { Video } from '../../shared/models/video.model';
import { VideoService } from '../../core/services/video.service';
import videojs from 'video.js';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

type VideoJsPlayer = ReturnType<typeof videojs>;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    SearchBarComponent,
    SidebarComponent,
  ],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  currentVideo: Video | null = null;
  player: VideoJsPlayer | null = null;
  isVideoPlaying: boolean = false;
  filteredVideos: Video[] = [];
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private videoService: VideoService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadVideosFromStore();
    this.resumeLastPlayedVideo();
  }

  /** Load videos from the store and set the initial list */
  loadVideosFromStore(): void {
    this.videoService.loadVideos();

    this.store.select(selectAllVideos).subscribe((videos) => {
      this.videos = videos;
      this.filteredVideos = videos;
    });

    this.store.select(selectCurrentVideoId).subscribe((id) => {
      if (id) {
        const selectedVideo = this.videos.find((video) => video.id === id);
        if (selectedVideo) {
          this.playSelectedVideo(selectedVideo);
        }
      }
    });
  }

  /** Resume the last played video from local storage */
  resumeLastPlayedVideo(): void {
    if (isPlatformBrowser(this.platformId)) {
      const lastPlayedVideo = localStorage.getItem('lastPlayedVideo');
      if (lastPlayedVideo) {
        const parsedVideo = JSON.parse(lastPlayedVideo);
        const video = this.videos.find(v => v.id === parsedVideo.id);
        if (video) {
          this.playSelectedVideo(video);
        }
      }

      const playbackState = localStorage.getItem('playbackState');
      if (playbackState) {
        const { currentTime, isPlaying } = JSON.parse(playbackState);
        if (this.player) {
          this.player.currentTime(currentTime);
          if (isPlaying) {
            this.player.play();
          } else {
            this.player.pause();
          }
        }
      }
    }
  }

  /** Handle video selection from the sidebar */
  handleVideoSelection(video: Video): void {
    this.currentVideo = video;
    this.playSelectedVideo(video);
    this.saveLastPlayedVideo(video);
  }

  /** Handle play/pause toggle event from the sidebar */
  handlePlayPause({ video, event }: { video: Video; event: Event }): void {
    event.stopPropagation();
  
    if (this.currentVideo?.id !== video.id) {
      if (this.player) {
        this.player.pause(); 
      }
      this.initializePlayer(video); 
      this.isVideoPlaying = true; 
      this.currentVideo = video; 
    } else {
      // Toggle play/pause for the same video
      if (this.isVideoPlaying) {
        this.player?.pause();
      } else {
        this.player?.play();
      }
      this.isVideoPlaying = !this.isVideoPlaying; 
    }
  
    this.savePlaybackState(); 
  }
  

  /** Initialize the video.js player with the selected video */
  initializePlayer(video: Video): void {
    this.currentVideo = video;
    this.isVideoPlaying = true;

    setTimeout(() => {
      if (!this.player) {
        this.player = videojs('video-player', {
          controls: true,
          autoplay: true,
          preload: 'auto',
          fluid: true,
        });
      }

      this.player.src({
        src: video.sources[0],
        type: 'video/mp4',
      });
      this.player.play();
    }, 0);
  }

  /** Play the selected video */
  playSelectedVideo(video: Video): void {
    if (!this.player) {
      this.initializePlayer(video);
    } else {
      this.player.src({ src: video.sources[0], type: 'video/mp4' });
      this.player.play();
      this.isVideoPlaying = true;
    }
  }

  /** Save the last played video to local storage */
  saveLastPlayedVideo(video: Video): void {
    localStorage.setItem('lastPlayedVideo', JSON.stringify(video));
  }

  /** Save the current playback state to local storage */
  savePlaybackState(): void {
    if (this.player) {
      const currentTime = this.player.currentTime();
      localStorage.setItem('playbackState', JSON.stringify({ currentTime, isPlaying: this.isVideoPlaying }));
    }
  }

  /** Filter videos based on the search query */
  filterVideos(query: string): void {
    this.filteredVideos = query.trim()
      ? this.videos.filter(video => video.title.toLowerCase().includes(query.toLowerCase()))
      : this.videos;
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }
}
