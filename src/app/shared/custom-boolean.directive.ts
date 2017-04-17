import { Directive, Input } from '@angular/core';
@Directive({
    selector: `[customBoolean]`
})
export class CustomBooleanDirective {
    @Input() customBoolean: boolean;

}
