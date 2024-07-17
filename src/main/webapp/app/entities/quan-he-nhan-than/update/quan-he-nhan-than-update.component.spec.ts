import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { QuanHeNhanThanService } from '../service/quan-he-nhan-than.service';
import { IQuanHeNhanThan } from '../quan-he-nhan-than.model';
import { QuanHeNhanThanFormService } from './quan-he-nhan-than-form.service';

import { QuanHeNhanThanUpdateComponent } from './quan-he-nhan-than-update.component';

describe('QuanHeNhanThan Management Update Component', () => {
  let comp: QuanHeNhanThanUpdateComponent;
  let fixture: ComponentFixture<QuanHeNhanThanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quanHeNhanThanFormService: QuanHeNhanThanFormService;
  let quanHeNhanThanService: QuanHeNhanThanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuanHeNhanThanUpdateComponent],
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
      .overrideTemplate(QuanHeNhanThanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuanHeNhanThanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quanHeNhanThanFormService = TestBed.inject(QuanHeNhanThanFormService);
    quanHeNhanThanService = TestBed.inject(QuanHeNhanThanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quanHeNhanThan: IQuanHeNhanThan = { id: 456 };

      activatedRoute.data = of({ quanHeNhanThan });
      comp.ngOnInit();

      expect(comp.quanHeNhanThan).toEqual(quanHeNhanThan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeNhanThan>>();
      const quanHeNhanThan = { id: 123 };
      jest.spyOn(quanHeNhanThanFormService, 'getQuanHeNhanThan').mockReturnValue(quanHeNhanThan);
      jest.spyOn(quanHeNhanThanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeNhanThan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeNhanThan }));
      saveSubject.complete();

      // THEN
      expect(quanHeNhanThanFormService.getQuanHeNhanThan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quanHeNhanThanService.update).toHaveBeenCalledWith(expect.objectContaining(quanHeNhanThan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeNhanThan>>();
      const quanHeNhanThan = { id: 123 };
      jest.spyOn(quanHeNhanThanFormService, 'getQuanHeNhanThan').mockReturnValue({ id: null });
      jest.spyOn(quanHeNhanThanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeNhanThan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeNhanThan }));
      saveSubject.complete();

      // THEN
      expect(quanHeNhanThanFormService.getQuanHeNhanThan).toHaveBeenCalled();
      expect(quanHeNhanThanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeNhanThan>>();
      const quanHeNhanThan = { id: 123 };
      jest.spyOn(quanHeNhanThanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeNhanThan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quanHeNhanThanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
