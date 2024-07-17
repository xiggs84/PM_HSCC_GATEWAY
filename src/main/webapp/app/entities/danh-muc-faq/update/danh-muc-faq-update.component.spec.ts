import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucFaqService } from '../service/danh-muc-faq.service';
import { IDanhMucFaq } from '../danh-muc-faq.model';
import { DanhMucFaqFormService } from './danh-muc-faq-form.service';

import { DanhMucFaqUpdateComponent } from './danh-muc-faq-update.component';

describe('DanhMucFaq Management Update Component', () => {
  let comp: DanhMucFaqUpdateComponent;
  let fixture: ComponentFixture<DanhMucFaqUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucFaqFormService: DanhMucFaqFormService;
  let danhMucFaqService: DanhMucFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucFaqUpdateComponent],
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
      .overrideTemplate(DanhMucFaqUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucFaqUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucFaqFormService = TestBed.inject(DanhMucFaqFormService);
    danhMucFaqService = TestBed.inject(DanhMucFaqService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucFaq: IDanhMucFaq = { id: 456 };

      activatedRoute.data = of({ danhMucFaq });
      comp.ngOnInit();

      expect(comp.danhMucFaq).toEqual(danhMucFaq);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucFaq>>();
      const danhMucFaq = { id: 123 };
      jest.spyOn(danhMucFaqFormService, 'getDanhMucFaq').mockReturnValue(danhMucFaq);
      jest.spyOn(danhMucFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucFaq }));
      saveSubject.complete();

      // THEN
      expect(danhMucFaqFormService.getDanhMucFaq).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucFaqService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucFaq));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucFaq>>();
      const danhMucFaq = { id: 123 };
      jest.spyOn(danhMucFaqFormService, 'getDanhMucFaq').mockReturnValue({ id: null });
      jest.spyOn(danhMucFaqService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucFaq: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucFaq }));
      saveSubject.complete();

      // THEN
      expect(danhMucFaqFormService.getDanhMucFaq).toHaveBeenCalled();
      expect(danhMucFaqService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucFaq>>();
      const danhMucFaq = { id: 123 };
      jest.spyOn(danhMucFaqService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucFaq });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucFaqService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
