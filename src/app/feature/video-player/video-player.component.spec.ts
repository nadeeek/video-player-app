import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VideoService } from '../../core/services/video.service';
import { selectAllVideos, selectCurrentVideoId } from '../../store/video.selectors';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;
  let mockStore: MockStore;
  let videoService: jasmine.SpyObj<VideoService>;

  const mockVideos = [
    { id: '1', title: 'Video 1', description: 'Test Video 1', sources: ['video1.mp4'], subtitle: 'subtitle 1' },
    { id: '2', title: 'Video 2', description: 'Test Video 2', sources: ['video2.mp4'], subtitle: 'subtitle 2' },
  ];

  beforeEach(async () => {
    videoService = jasmine.createSpyObj('VideoService', ['loadVideos']);
    
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), VideoPlayerComponent, NoopAnimationsModule], 
      providers: [
        provideMockStore(),
        { provide: VideoService, useValue: videoService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load videos from the store on initialization', () => {
    mockStore.overrideSelector(selectAllVideos, mockVideos);
    fixture.detectChanges();

    expect(videoService.loadVideos).toHaveBeenCalled();
    expect(component.videos.length).toBe(2);
    expect(component.videos[0].title).toBe('Video 1');
  });

  it('should play the selected video', () => {
    component.initializePlayer = jasmine.createSpy('initializePlayer');
    component.playSelectedVideo(mockVideos[0]);

    expect(component.initializePlayer).toHaveBeenCalledWith(mockVideos[0]);
  });

  it('should filter videos based on the search query', () => {
    component.videos = mockVideos;
    component.filterVideos('video 1');

    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Video 1');
  });

  it('should save the last played video to local storage', () => {
    spyOn(localStorage, 'setItem');
    component.saveLastPlayedVideo(mockVideos[0]);

    expect(localStorage.setItem).toHaveBeenCalledWith('lastPlayedVideo', JSON.stringify(mockVideos[0]));
  });
 
});
