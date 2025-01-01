import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './feature/video-player/video-player.component';
import { StoreModule, Store } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

const mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerComponent, NoopAnimationsModule, StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: mockStore }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the "video-player-app" title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('video-player-app');
  });
});
