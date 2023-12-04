import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignInComponent } from './signin.component';
import { By } from "@angular/platform-browser";

describe('SigninComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [ SignInComponent ],
      imports: [ReactiveFormsModule, FontAwesomeModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // L'élément doit être crée
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Il doit y avoir 2 champs input
  it('should display 2 inputs', () => {
    expect(fixture.nativeElement.querySelectorAll('input').length).toEqual(2);
  })

  // Il doit y avoir 1 bouton
  it('should display 1 button', () => {
    expect(fixture.nativeElement.querySelectorAll('button').length).toEqual(1);
  })

  // La fonction onSubmit est call au click du bouton
  it('should call onSubmit function when submit button is clicked', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css(".btn")
    ).nativeElement;

    //On crée un spy sur le onSubmit
    spyOn(component, "onSubmit").and.callThrough();
    
    button.click();
    //On vérifie que la fonction onSubmit a été appelé
    expect(component.onSubmit).toHaveBeenCalled();
  })

  // Le click de l'oeil appelle la fonction togglefieldTextType
  it('should call togglefieldTextType function when eye button is clicked', () => {
    const button: HTMLSpanElement = fixture.debugElement.query(
      By.css("#icon-passwd")
    ).nativeElement;

    //On crée un spy sur le togglefieldTextType
    spyOn(component, "togglefieldTextType").and.callThrough();
    
    button.click();
    //On vérifie que la fonction togglefieldTextType a été appelé
    expect(component.togglefieldTextType).toHaveBeenCalled();
  })
});
