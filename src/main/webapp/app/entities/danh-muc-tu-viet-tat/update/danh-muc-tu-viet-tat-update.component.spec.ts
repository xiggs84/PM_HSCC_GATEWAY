import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucTuVietTatService } from '../service/danh-muc-tu-viet-tat.service';
import { IDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';
import { DanhMucTuVietTatFormService } from './danh-muc-tu-viet-tat-form.service';

import { DanhMucTuVietTatUpdateComponent } from './danh-muc-tu-viet-tat-update.component';

describe('DanhMucTuVietTat Management Update Component', () => {
  let comp: DanhMucTuVietTatUpdateComponent;
  let fixture: ComponentFixture<DanhMucTuVietTatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucTuVietTatFormService: DanhMucTuVietTatFormService;
  let danhMucTuVietTatService: DanhMucTuVietTatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTuVietTatUpdateComponent],
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
      .overrideTemplate(DanhMucTuVietTatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucTuVietTatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucTuVietTatFormService = TestBed.inject(DanhMucTuVietTatFormService);
    danhMucTuVietTatService = TestBed.inject(DanhMucTuVietTatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucTuVietTat: IDanhMucTuVietTat = { id: 456 };

      activatedRoute.data = of({ danhMucTuVietTat });
      comp.ngOnInit();

      expect(comp.danhMucTuVietTat).toEqual(danhMucTuVietTat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTuVietTat>>();
      const danhMucTuVietTat = { id: 123 };
      jest.spyOn(danhMucTuVietTatFormService, 'getDanhMucTuVietTat').mockReturnValue(danhMucTuVietTat);
      jest.spyOn(danhMucTuVietTatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTuVietTat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTuVietTat }));
      saveSubject.complete();

      // THEN
      expect(danhMucTuVietTatFormService.getDanhMucTuVietTat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucTuVietTatService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucTuVietTat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTuVietTat>>();
      const danhMucTuVietTat = { id: 123 };
      jest.spyOn(danhMucTuVietTatFormService, 'getDanhMucTuVietTat').mockReturnValue({ id: null });
      jest.spyOn(danhMucTuVietTatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTuVietTat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTuVietTat }));
      saveSubject.complete();

      // THEN
      expect(danhMucTuVietTatFormService.getDanhMucTuVietTat).toHaveBeenCalled();
      expect(danhMucTuVietTatService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTuVietTat>>();
      const danhMucTuVietTat = { id: 123 };
      jest.spyOn(danhMucTuVietTatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTuVietTat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucTuVietTatService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
