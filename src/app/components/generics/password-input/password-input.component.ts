import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiHintDirective } from '@taiga-ui/core';
import type { TuiNativeFocusableElement } from '@taiga-ui/legacy';
import {
  AbstractTuiControl,
  TuiPrimitiveTextfieldComponent,
  TuiPrimitiveTextfieldModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    TuiButton,
    TuiHintDirective,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent extends AbstractTuiControl<string> {
  @Input() password: string = '';
  @Input() formControl!: FormControl;
  @Input() placeholder: string = '';
  @Output() passwordChange = new EventEmitter<string>();

  onPasswordInput(value: string) {
    this.password = value;
    this.passwordChange.emit(this.password);
  }

  @ViewChild(TuiPrimitiveTextfieldComponent)
  private readonly textfield?: TuiPrimitiveTextfieldComponent;

  private isPasswordHidden = true;

  public get focused(): boolean {
    return !!this.textfield?.focused;
  }

  protected get nativeFocusableElement(): TuiNativeFocusableElement | null {
    return this.computedDisabled || !this.textfield
      ? null
      : this.textfield.nativeFocusableElement;
  }

  protected get icon(): string {
    return this.isPasswordHidden ? '@tui.eye' : '@tui.eye-off';
  }

  protected get hint(): string {
    return this.isPasswordHidden ? 'Show password' : 'Hide password';
  }

  protected get inputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  protected onFocused(focused: boolean): void {
    this.updateFocused(focused);
  }

  protected togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  protected getFallbackValue(): string {
    return '';
  }
}
