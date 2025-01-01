import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the input element to searchQuery', () => {
    const inputElement = debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'test search';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchQuery).toBe('test search');
  });

  it('should emit the search event with the correct search query', () => {
    spyOn(component.search, 'emit');

    component.searchQuery = 'Big Buck';
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith('Big Buck');
  });
  
});
