import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { SoCongChungService } from '../service/so-cong-chung.service';
import { ISoCongChung } from '../so-cong-chung.model';
import { SoCongChungFormService } from './so-cong-chung-form.service';

import { SoCongChungUpdateComponent } from './so-cong-chung-update.component';

describe('SoCongChung Management Update Component', () => {
  let comp: SoCongChungUpdateComponent;
  let fixture: ComponentFixture<SoCongChungUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soCongChungFormService: SoCongChungFormService;
  let soCongChungService: SoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SoCongChungUpdateComponent],
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
      .overrideTemplate(SoCongChungUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoCongChungUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soCongChungFormService = TestBed.inject(SoCongChungFormService);
    soCongChungService = TestBed.inject(SoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const soCongChung: ISoCongChung = { id: 456 };

      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      expect(comp.soCongChung).toEqual(soCongChung);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChung>>();
      const soCongChung = { id: 123 };
      jest.spyOn(soCongChungFormService, 'getSoCongChung').mockReturnValue(soCongChung);
      jest.spyOn(soCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soCongChung }));
      saveSubject.complete();

      // THEN
      expect(soCongChungFormService.getSoCongChung).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(soCongChungService.update).toHaveBeenCalledWith(expect.objectContaining(soCongChung));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChung>>();
      const soCongChung = { id: 123 };
      jest.spyOn(soCongChungFormService, 'getSoCongChung').mockReturnValue({ id: null });
      jest.spyOn(soCongChungService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChung: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soCongChung }));
      saveSubject.complete();

      // THEN
      expect(soCongChungFormService.getSoCongChung).toHaveBeenCalled();
      expect(soCongChungService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISoCongChung>>();
      const soCongChung = { id: 123 };
      jest.spyOn(soCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soCongChungService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
