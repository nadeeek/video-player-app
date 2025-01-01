import { createAction, props } from '@ngrx/store';
import { Video } from '../shared/models/video.model';

export const loadVideos = createAction('[Video] Load Videos');
export const loadVideosSuccess = createAction(
  '[Video] Load Videos Success',
  props<{ videos: Video[] }>()
);
export const loadVideosFailure = createAction(
  '[Video] Load Videos Failure',
  props<{ error: any }>()
);
