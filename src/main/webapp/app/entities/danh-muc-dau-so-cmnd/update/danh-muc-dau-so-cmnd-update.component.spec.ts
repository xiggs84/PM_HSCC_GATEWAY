import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucDauSoCmndService } from '../service/danh-muc-dau-so-cmnd.service';
import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';
import { DanhMucDauSoCmndFormService } from './danh-muc-dau-so-cmnd-form.service';

import { DanhMucDauSoCmndUpdateComponent } from './danh-muc-dau-so-cmnd-update.component';

describe('DanhMucDauSoCmnd Management Update Component', () => {
  let comp: DanhMucDauSoCmndUpdateComponent;
  let fixture: ComponentFixture<DanhMucDauSoCmndUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucDauSoCmndFormService: DanhMucDauSoCmndFormService;
  let danhMucDauSoCmndService: DanhMucDauSoCmndService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDauSoCmndUpdateComponent],
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
      .overrideTemplate(DanhMucDauSoCmndUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucDauSoCmndUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucDauSoCmndFormService = TestBed.inject(DanhMucDauSoCmndFormService);
    danhMucDauSoCmndService = TestBed.inject(DanhMucDauSoCmndService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucDauSoCmnd: IDanhMucDauSoCmnd = { id: 456 };

      activatedRoute.data = of({ danhMucDauSoCmnd });
      comp.ngOnInit();

      expect(comp.danhMucDauSoCmnd).toEqual(danhMucDauSoCmnd);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDauSoCmnd>>();
      const danhMucDauSoCmnd = { id: 123 };
      jest.spyOn(danhMucDauSoCmndFormService, 'getDanhMucDauSoCmnd').mockReturnValue(danhMucDauSoCmnd);
      jest.spyOn(danhMucDauSoCmndService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDauSoCmnd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDauSoCmnd }));
      saveSubject.complete();

      // THEN
      expect(danhMucDauSoCmndFormService.getDanhMucDauSoCmnd).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucDauSoCmndService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucDauSoCmnd));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDauSoCmnd>>();
      const danhMucDauSoCmnd = { id: 123 };
      jest.spyOn(danhMucDauSoCmndFormService, 'getDanhMucDauSoCmnd').mockReturnValue({ id: null });
      jest.spyOn(danhMucDauSoCmndService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDauSoCmnd: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDauSoCmnd }));
      saveSubject.complete();

      // THEN
      expect(danhMucDauSoCmndFormService.getDanhMucDauSoCmnd).toHaveBeenCalled();
      expect(danhMucDauSoCmndService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDauSoCmnd>>();
      const danhMucDauSoCmnd = { id: 123 };
      jest.spyOn(danhMucDauSoCmndService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDauSoCmnd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucDauSoCmndService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
