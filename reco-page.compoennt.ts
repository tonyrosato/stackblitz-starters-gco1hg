import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AnalyticsEventDirective } from '../analytics-event/analytics-event.directive';
import { ClickEventModel } from '../analytics-event/click-event-model';
import { RecoLoadingMessageComponent } from '../reco-loading-message/reco-loading-message.component';
import { SidePanelComponent } from '../side-panel/side-panel.component';

export interface CtaEventData {
  title: string;
  url: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RecoLoadingMessageComponent,
    SidePanelComponent,
    AnalyticsEventDirective,
  ],
  selector: 'app-reco-page',
  templateUrl: './reco-page.component.html',
  styleUrls: ['./reco-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'appRecoPage',
})
export class RecoPageComponent {
  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  @Input()
  preTitle = '';

  @Input()
  ctaTitle = '';

  @Input()
  ctaUrl = '';

  @Output()
  ctaClick = new EventEmitter<CtaEventData>();

  @Output()
  startOverClick = new EventEmitter();

  @ViewChild('writeToUsLink', { static: false })
  writeToUsLink!: ElementRef<HTMLAnchorElement>;
  @ViewChild('phoneNumberLink', { static: false })
  phoneNumberLink!: ElementRef<HTMLAnchorElement>;
  @ViewChild('moreInfoButton', { static: false })
  moreInfoButton!: ElementRef<HTMLButtonElement>;

  animationTriggered = false;

  onCtaClick(): void {
    this.ctaClick.emit({ title: this.ctaTitle, url: this.ctaUrl });
  }

  onStartOver(): void {
    this.startOverClick.emit();
  }

  startAnimation(): void {
    this.animationTriggered = true;
    this._changeDetectorRef.detectChanges();
  }

  endAnimation(): void {
    this.animationTriggered = false;
  }

  get writeToUsEventObject(): ClickEventModel {
    if (this.writeToUsLink && this.writeToUsLink.nativeElement) {
      const linkElement = this.writeToUsLink.nativeElement;
      return {
        component: 'link',
        component_title: 'write-to-us',
        component_href: linkElement.href,
        component_text: linkElement.text,
      };
    }
    return {} as ClickEventModel; // Return a default or empty object if the ViewChild is not yet available
  }
  
  get phoneNumberEventObject(): ClickEventModel {
    if (this.phoneNumberLink && this.phoneNumberLink.nativeElement) {
      const linkElement = this.phoneNumberLink.nativeElement;
      return {
        component: 'link',
        component_title: 'phone-number',
        component_href: linkElement.href,
        component_text: linkElement.text,
      };
    }
    return {} as ClickEventModel;
  }
  
  get moreInfoEventObject(): ClickEventModel {
    if (this.moreInfoButton && this.moreInfoButton.nativeElement) {
      const buttonElement = this.moreInfoButton.nativeElement;
      return {
        component: 'button',
        component_title: 'more-info',
        component_href: 'panel-open',
        component_text: buttonElement.innerText,
      };
    }
    return {} as ClickEventModel;
  }
  
}

Thank you for the suggestion. I agree that using ViewChild and converting the method to a getter, like writeToUsEventObject, can make the code cleaner and more intuitive. It's a great approach, especially for reducing the number of parameters and making the template more concise.

However, I also believe that the current method-based approach has its merits. It offers flexibility, especially if we anticipate changes or additional parameters in the future. Both approaches have their advantages, and I appreciate your insight on this.

That being said, while I value this feedback and will certainly consider it for future improvements, I believe that the current implementation is robust and meets our requirements. I hope this won't hinder the merge of this pull-request. Let's discuss further and decide on the best approach that aligns with our project's goals and coding standards.