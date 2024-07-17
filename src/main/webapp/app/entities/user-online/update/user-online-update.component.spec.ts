import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { UserOnlineService } from '../service/user-online.service';
import { IUserOnline } from '../user-online.model';
import { UserOnlineFormService } from './user-online-form.service';

import { UserOnlineUpdateComponent } from './user-online-update.component';

describe('UserOnline Management Update Component', () => {
  let comp: UserOnlineUpdateComponent;
  let fixture: ComponentFixture<UserOnlineUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userOnlineFormService: UserOnlineFormService;
  let userOnlineService: UserOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserOnlineUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UserOnlineUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserOnlineUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userOnlineFormService = TestBed.inject(UserOnlineFormService);
    userOnlineService = TestBed.inject(UserOnlineService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const userOnline: IUserOnline = { id: 456 };

      activatedRoute.data = of({ userOnline });
      comp.ngOnInit();

      expect(comp.userOnline).toEqual(userOnline);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserOnline>>();
      const userOnline = { id: 123 };
      jest.spyOn(userOnlineFormService, 'getUserOnline').mockReturnValue(userOnline);
      jest.spyOn(userOnlineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userOnline });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userOnline }));
      saveSubject.complete();

      // THEN
      expect(userOnlineFormService.getUserOnline).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userOnlineService.update).toHaveBeenCalledWith(expect.objectContaining(userOnline));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserOnline>>();
      const userOnline = { id: 123 };
      jest.spyOn(userOnlineFormService, 'getUserOnline').mockReturnValue({ id: null });
      jest.spyOn(userOnlineService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userOnline: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userOnline }));
      saveSubject.complete();

      // THEN
      expect(userOnlineFormService.getUserOnline).toHaveBeenCalled();
      expect(userOnlineService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserOnline>>();
      const userOnline = { id: 123 };
      jest.spyOn(userOnlineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userOnline });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userOnlineService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
