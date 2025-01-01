import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadVideosSuccess } from '../../store/video.actions';
import { Video } from '../../shared/models/video.model';
import videosData from '../../assets/videos.json'; // Import the JSON file

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  constructor(private store: Store) {}

  loadVideos() {
    try {
      const videos: Video[] = videosData.categories[0]?.videos || [];
      
      this.store.dispatch(loadVideosSuccess({ videos }));
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  }
}
