import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AnalyticsService, EventModel } from '@core';
import { AnalyticsEventDirective } from './analytics-event.directive';

@Component({
  template: `<button [analyticsEvent]="testEvent" appAnalyticsEvent>
    Click me
  </button>`,
})
class TestComponent {
  testEvent: EventModel = {
    event_name: 'click',
    component: 'button',
    component_title: 'Default_Title',
    component_href: '2#',
    component_contentid: 'none',
    component_text: 'Default_Text',
  };
}

describe('AnalyticsEventDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonEl: HTMLElement;
  const mockAnalyticsService = {
    trackEvent: jest.fn() as jest.MockedFunction<
      typeof AnalyticsService.prototype.trackEvent
    >,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsEventDirective, TestComponent],
      providers: [
        { provide: AnalyticsService, useValue: mockAnalyticsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    buttonEl = fixture.nativeElement.querySelector('button');
  });

  it('should create an instance', () => {
    const directive = new AnalyticsEventDirective(mockAnalyticsService as any);
    expect(directive).toBeTruthy();
  });

  it('should call trackEvent with correct values when button is clicked', () => {
    fixture.componentInstance.testEvent = {
      event_name: 'click',
      component: 'button',
      component_title: 'Default_Title',
      component_href: 'example.com/#',
      component_contentid: 'none',
      component_text: 'Default_Text',
    };
    fixture.detectChanges();
    buttonEl.click();

    (expect(mockAnalyticsService.trackEvent) as jest.Mock).toHaveBeenCalledWith(
      {
        event_name: 'click',
        component: 'button',
        component_title: 'Default_Title',
        component_href: 'example.com/',
        component_contentid: 'none',
        component_text: 'Default_Text',
      }
    );
  });
});
