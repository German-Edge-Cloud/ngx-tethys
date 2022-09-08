import { Component, ElementRef, HostBinding, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { InputBoolean, UpdateHostClassService, isTextColor } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyBadgeSize = 'md' | 'sm' | 'lg';

/**
 * 徽标组件，支持组件`thy-badge`和`thyBadge`指令两种使用方式
 * @name thy-badge,[thyBadge]
 */
@Component({
    selector: 'thy-badge,[thyBadge]',
    templateUrl: './badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateHostClassService],
    host: {
        class: 'thy-badge-container',
        '[class.thy-badge-wrapper]': 'isWrapper'
    }
})
export class ThyBadgeComponent implements OnInit {
    displayContent = '';

    badgeClassName = '';

    private nativeElement: any;

    private initialized = false;

    // 是否包裹在元素上
    protected isWrapper = false;

    protected isShowBadge = true;

    private keepShowValue = false;

    private value: number | string = '';

    private valueHasBeenSet = false;

    private maxCount: number;

    private type: string;

    private size: ThyBadgeSize;

    private isDot: boolean;

    private isHollow: boolean;

    protected textColor: string;

    protected builtInTextColorClass: string;

    protected backgroundColor: string;

    protected builtInBackgroundColorClass: string;

    protected supClasses: string[] = [];

    constructor(private elementRef: ElementRef) {
        this.nativeElement = this.elementRef.nativeElement;
    }

    /**
     * 徽标类型, 类型为 'default' | 'primary' | 'danger' | 'warning' | 'success'
     * @default danger
     */
    @Input()
    set thyType(value: string) {
        this.type = value;
        if (this.initialized) {
            this.combineBadgeClasses();
        }
    }

    /**
     * 徽标内容数字
     */
    @Input()
    set thyCount(value: number) {
        this.value = value;
        this.valueHasBeenSet = true;
        if (this.initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClasses();
        }
    }

    /**
     * 徽标内容文本
     */
    @Input()
    set thyContent(value: string) {
        this.value = value;
        this.valueHasBeenSet = true;
        if (this.initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClasses();
        }
    }

    /**
     * 已废弃，徽标内容文本，命名错误，请使用 thyContent
     * @deprecated
     */
    @Input()
    set thyContext(value: string) {
        this.thyContent = value;
    }

    /**
     * 徽标显示的最大值, 与 thyCount 一起使用,thyCount 超过了 thyMaxCount 设置的值时，徽标内容为 thyMaxCount+
     */
    @Input()
    set thyMaxCount(value: number) {
        this.maxCount = value;
        if (this.initialized) {
            this.combineBadgeDisplayContent();
            this.combineBadgeClasses();
        }
    }

    /**
     * 徽标显示的大小，分别为 'sm' | 'md' | 'lg'
     * @default md
     */
    @Input()
    set thySize(value: ThyBadgeSize) {
        this.size = value;

        if (this.initialized) {
            this.combineBadgeClasses();
        }
    }

    /**
     * 已废弃，徽标是一个实心点，已经被废弃
     */
    @Input()
    @InputBoolean()
    set thyIsDot(value: boolean) {
        this.isDot = value;
        if (this.initialized) {
            this.combineBadgeClasses();
        }
    }

    /**
     * 已废弃，徽标是一个空心点，
     */
    @Input()
    @InputBoolean()
    set thyIsHollow(value: boolean) {
        this.isHollow = value;
        if (this.initialized) {
            this.combineBadgeClasses();
        }
    }

    /**
     * thyCount 为 0 时，强制显示数字 0，默认不显示
     */
    @Input()
    set thyKeepShow(value: boolean) {
        this.keepShowValue = coerceBooleanProperty(value);
        if (this.initialized) {
            this.combineBadgeDisplayContent();
        }
    }

    /**
     * 设置徽标字体的颜色，支持内置颜色和自定义颜色 'primary' | '#87d068' | ...
     */
    @Input()
    set thyTextColor(value: string) {
        if (isTextColor(value)) {
            this.builtInTextColorClass = `text-${value}`;
            this.textColor = null;
        } else {
            this.textColor = value;
            this.builtInTextColorClass = null;
        }
        if (this.initialized) {
            this.combineBadgeClasses();
        }
    }

    /**
     * 设置徽标的背景颜色，支持内置颜色和自定义颜色 'primary' | '#87d068' | ...
     */
    @Input()
    set thyBackgroundColor(value: string) {
        if (isTextColor(value)) {
            this.builtInBackgroundColorClass = `bg-${value}`;
            this.backgroundColor = null;
        } else {
            this.backgroundColor = value;
            this.builtInBackgroundColorClass = null;
        }
        if (this.initialized) {
            this.combineBadgeClasses();
        }
    }

    ngOnInit() {
        let childNodeCount = 0;
        this.nativeElement.childNodes.forEach((n: HTMLElement) => {
            if (['#comment'].indexOf(n.nodeName) < 0) {
                childNodeCount++;
            }
        });
        this.isWrapper = childNodeCount > 0;

        this.combineBadgeClasses();

        if (this.valueHasBeenSet) {
            this.combineBadgeDisplayContent();
        }

        this.initialized = true;
    }

    private combineBadgeClasses() {
        const classes: string[] = [];
        classes.push(`thy-badge-${this.type || 'danger'}`);
        if (this.size) {
            classes.push(`thy-badge-${this.size}`);
        }
        if (this.isDot) {
            classes.push(`thy-badge-dot`);
        } else if (this.isHollow) {
            classes.push(`thy-badge-hollow`);
        } else {
            classes.push(`thy-badge-count`);
        }

        if (this.builtInTextColorClass) {
            classes.push(this.builtInTextColorClass);
        }
        if (this.builtInBackgroundColorClass) {
            classes.push(this.builtInBackgroundColorClass);
        }
        this.badgeClassName = classes.join(' ');
    }

    private combineBadgeDisplayContent() {
        this.displayContent = this.value as string;
        if (this.value && this.maxCount != undefined && this.value > this.maxCount) {
            this.displayContent = `${this.maxCount}+`;
        }

        if (!this.value && !this.keepShowValue) {
            this.isShowBadge = false;
        } else {
            this.isShowBadge = true;
        }
    }
}
