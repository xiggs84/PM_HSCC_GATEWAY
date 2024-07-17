import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucCapQuanLyService } from '../service/danh-muc-cap-quan-ly.service';
import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';
import { DanhMucCapQuanLyFormService } from './danh-muc-cap-quan-ly-form.service';

import { DanhMucCapQuanLyUpdateComponent } from './danh-muc-cap-quan-ly-update.component';

describe('DanhMucCapQuanLy Management Update Component', () => {
  let comp: DanhMucCapQuanLyUpdateComponent;
  let fixture: ComponentFixture<DanhMucCapQuanLyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucCapQuanLyFormService: DanhMucCapQuanLyFormService;
  let danhMucCapQuanLyService: DanhMucCapQuanLyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucCapQuanLyUpdateComponent],
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
      .overrideTemplate(DanhMucCapQuanLyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucCapQuanLyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucCapQuanLyFormService = TestBed.inject(DanhMucCapQuanLyFormService);
    danhMucCapQuanLyService = TestBed.inject(DanhMucCapQuanLyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucCapQuanLy: IDanhMucCapQuanLy = { id: 456 };

      activatedRoute.data = of({ danhMucCapQuanLy });
      comp.ngOnInit();

      expect(comp.danhMucCapQuanLy).toEqual(danhMucCapQuanLy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucCapQuanLy>>();
      const danhMucCapQuanLy = { id: 123 };
      jest.spyOn(danhMucCapQuanLyFormService, 'getDanhMucCapQuanLy').mockReturnValue(danhMucCapQuanLy);
      jest.spyOn(danhMucCapQuanLyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucCapQuanLy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucCapQuanLy }));
      saveSubject.complete();

      // THEN
      expect(danhMucCapQuanLyFormService.getDanhMucCapQuanLy).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucCapQuanLyService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucCapQuanLy));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucCapQuanLy>>();
      const danhMucCapQuanLy = { id: 123 };
      jest.spyOn(danhMucCapQuanLyFormService, 'getDanhMucCapQuanLy').mockReturnValue({ id: null });
      jest.spyOn(danhMucCapQuanLyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucCapQuanLy: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucCapQuanLy }));
      saveSubject.complete();

      // THEN
      expect(danhMucCapQuanLyFormService.getDanhMucCapQuanLy).toHaveBeenCalled();
      expect(danhMucCapQuanLyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucCapQuanLy>>();
      const danhMucCapQuanLy = { id: 123 };
      jest.spyOn(danhMucCapQuanLyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucCapQuanLy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucCapQuanLyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
