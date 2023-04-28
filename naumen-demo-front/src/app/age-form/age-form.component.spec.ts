import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeFormComponent } from './age-form.component';
import { BackBindingService } from '../back-binding.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

let successfullServiceStub: Partial<BackBindingService> = {
  getAge(name) {
    return new Observable(subscriber => {
      subscriber.next({
        name: name,
        age: 12,
        requestCount: 1
      })
    })
  }
}

let neverServiceStub: Partial<BackBindingService> = {
  getAge(name) {
    return new Observable(subscriber => {
      subscriber.complete()
    })
  }
}

function tbBase(stub: Partial<BackBindingService>) {
  return {
    declarations: [AgeFormComponent],
    providers: [{ provide: BackBindingService, useValue: stub }],
    imports: [FormsModule, HttpClientTestingModule]
  }
}

describe('AgeFormComponent (successfull service)', () => {
  let component: AgeFormComponent;
  let fixture: ComponentFixture<AgeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(tbBase(successfullServiceStub))
    .compileComponents();

    fixture = TestBed.createComponent(AgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on start, model should have appropriate state', () => {
    expect(component.model).toBeUndefined()
    expect(component.input).toEqual('')
    expect(component.awaiting).toBeFalse()
  })

  it('clicking on button with empty form should display error message', () => {
    let formElement: HTMLElement = fixture.nativeElement;
    let form = formElement.querySelector('form')
    form?.dispatchEvent(new Event('submit'))
    fixture.detectChanges()
    let output = formElement.querySelector('p.output.error')
    expect(output?.textContent).toEqual('Name required')
  })

  it('submitting name should display view of model', () => {
    let formElement: HTMLElement = fixture.nativeElement;
    let input = formElement.querySelector('input')
    expect(input).toBeDefined()
    input = input!
    input.value = 'Name'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    let form = formElement.querySelector('form')
    form?.dispatchEvent(new Event('submit'))
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      let output = formElement.querySelector('p.output')
      expect(output?.textContent).toContain('Name')
    })
  })
});

describe('AgeFormComponent (slow service)', () => {
  let component: AgeFormComponent;
  let fixture: ComponentFixture<AgeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(tbBase(neverServiceStub))
    .compileComponents();

    fixture = TestBed.createComponent(AgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display loading message when submitting', () => {
    let formElement: HTMLElement = fixture.nativeElement;
    let input = formElement.querySelector('input')
    expect(input).toBeDefined()
    input = input!
    input.value = 'Name'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    let form = formElement.querySelector('form')
    form?.dispatchEvent(new Event('submit'))
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      let output = formElement.querySelector('p.output.loading')
      expect(output?.textContent).toContain('Loading...')
    })
  })
})