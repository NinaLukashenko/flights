import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsListActionsPanelComponent } from './flights-list-actions-panel.component';

describe('FlightsListActionsPanelComponent', () => {
  let component: FlightsListActionsPanelComponent;
  let fixture: ComponentFixture<FlightsListActionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsListActionsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsListActionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
