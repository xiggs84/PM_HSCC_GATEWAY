import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucTheHtmlService } from '../service/danh-muc-the-html.service';
import { IDanhMucTheHtml } from '../danh-muc-the-html.model';
import { DanhMucTheHtmlFormService } from './danh-muc-the-html-form.service';

import { DanhMucTheHtmlUpdateComponent } from './danh-muc-the-html-update.component';

describe('DanhMucTheHtml Management Update Component', () => {
  let comp: DanhMucTheHtmlUpdateComponent;
  let fixture: ComponentFixture<DanhMucTheHtmlUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucTheHtmlFormService: DanhMucTheHtmlFormService;
  let danhMucTheHtmlService: DanhMucTheHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTheHtmlUpdateComponent],
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
      .overrideTemplate(DanhMucTheHtmlUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucTheHtmlUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucTheHtmlFormService = TestBed.inject(DanhMucTheHtmlFormService);
    danhMucTheHtmlService = TestBed.inject(DanhMucTheHtmlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucTheHtml: IDanhMucTheHtml = { id: 456 };

      activatedRoute.data = of({ danhMucTheHtml });
      comp.ngOnInit();

      expect(comp.danhMucTheHtml).toEqual(danhMucTheHtml);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTheHtml>>();
      const danhMucTheHtml = { id: 123 };
      jest.spyOn(danhMucTheHtmlFormService, 'getDanhMucTheHtml').mockReturnValue(danhMucTheHtml);
      jest.spyOn(danhMucTheHtmlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTheHtml });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTheHtml }));
      saveSubject.complete();

      // THEN
      expect(danhMucTheHtmlFormService.getDanhMucTheHtml).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucTheHtmlService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucTheHtml));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTheHtml>>();
      const danhMucTheHtml = { id: 123 };
      jest.spyOn(danhMucTheHtmlFormService, 'getDanhMucTheHtml').mockReturnValue({ id: null });
      jest.spyOn(danhMucTheHtmlService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTheHtml: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTheHtml }));
      saveSubject.complete();

      // THEN
      expect(danhMucTheHtmlFormService.getDanhMucTheHtml).toHaveBeenCalled();
      expect(danhMucTheHtmlService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTheHtml>>();
      const danhMucTheHtml = { id: 123 };
      jest.spyOn(danhMucTheHtmlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTheHtml });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucTheHtmlService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
