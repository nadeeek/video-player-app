import { createReducer, on } from '@ngrx/store';
import { loadVideosSuccess } from './video.actions';
import { Video } from '../shared/models/video.model';

export interface VideoState {
  videos: Video[];
  currentVideoId: string | null;
}

export const initialState: VideoState = {
  videos: [],
  currentVideoId: null,
};

export const videoReducer = createReducer(
  initialState,
  on(loadVideosSuccess, (state, { videos }) => ({
    ...state,
    videos,
  }))
);
