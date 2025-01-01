import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideoState } from './video.reducer';

export const selectVideoState = createFeatureSelector<VideoState>('video');

export const selectAllVideos = createSelector(
  selectVideoState,
  (state: VideoState) => state.videos
);

export const selectCurrentVideoId = createSelector(
  selectVideoState,
  (state: VideoState) => state.currentVideoId
);
