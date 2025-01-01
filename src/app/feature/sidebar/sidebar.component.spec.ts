import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Video } from '../../shared/models/video.model';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockVideos: Video[] = [
    { id: '1', title: 'Video 1', description: 'Test Video 1', sources: ['video1.mp4'], subtitle: 'subtitle 1' },
    { id: '2', title: 'Video 2', description: 'Test Video 2', sources: ['video2.mp4'], subtitle: 'subtitle 2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        SearchBarComponent,
        SidebarComponent, 
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.videos = mockVideos;
    fixture.detectChanges();
  });

  it('should initialize filteredVideos with the input videos', () => {
    expect(component.filteredVideos).toEqual(mockVideos);
  });

  it('should filter videos based on the search query', () => {
    component.onSearch('Video 2');
    expect(component.filteredVideos).toEqual([
        { id: '2', title: 'Video 2', description: 'Test Video 2', sources: ['video2.mp4'], subtitle: 'subtitle 2' },
    ]);
  });

  it('should reset filtered videos when the search query is empty', () => {
    component.onSearch('Video 2');
    expect(component.filteredVideos.length).toBe(1);

    component.onSearch('');
    expect(component.filteredVideos).toEqual(mockVideos);
  });

  it('should emit videoSelected event when a video is selected', () => {
    spyOn(component.videoSelected, 'emit');
    const video = mockVideos[0];

    component.selectVideo(video);
    expect(component.videoSelected.emit).toHaveBeenCalledWith(video);
  });

  it('should emit playPauseToggled event with correct payload', () => {
    spyOn(component.playPauseToggled, 'emit');
    const video = mockVideos[1];
    const event = new Event('click');

    component.togglePlayPause(video, event);
    expect(component.playPauseToggled.emit).toHaveBeenCalledWith({ video, event });
  });

  it('should return true if the current video is playing', () => {
    component.currentVideo = mockVideos[0];
    component.isVideoPlaying = true;

    expect(component.isPlaying(mockVideos[0])).toBeTrue();
  });

  it('should return false if the current video is not playing', () => {
    component.currentVideo = mockVideos[1];
    component.isVideoPlaying = false;

    expect(component.isPlaying(mockVideos[0])).toBeFalse();
  });
});
