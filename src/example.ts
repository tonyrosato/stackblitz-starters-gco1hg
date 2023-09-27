import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { AnalyticsService } from '@core';

interface EventModel {
  event_name?: string;
  component?: string;
  component_title: string;
  component_href: string;
  component_contentid?: string;
  component_text: string;
  action_type?: string;
  action_code?: string;
}

@Directive({
  standalone: true,
  selector: '[appAnalyticsEvent]',
})
export class AnalyticsEventDirective {
  @HostBinding('attr.appAnalyticsEvent')
  @Input('appAnalyticsEvent')
  analyticsEvent!: EventModel;

  constructor(private _analyticsService: AnalyticsService) {}

  @HostListener('click')
  handleClick(): void {
    this._sendAnalyticsEvent();
  }

  private _sendAnalyticsEvent(): void {
    const eventDetails = {
      ...{ event_name: 'click', component_contentid: 'none' },
      ...this.analyticsEvent,
    };

    if (eventDetails.event_name && eventDetails.component) {
      eventDetails.component_href = this._formatUrl(
        eventDetails.component_href
      );
      this._analyticsService.trackEvent(eventDetails);
    }
  }

  private _formatUrl(url: string): string {
    return url.split(/[?#]/)[0];
  }
}
