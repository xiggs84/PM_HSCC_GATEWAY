import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucDichVuService } from '../service/danh-muc-dich-vu.service';
import { IDanhMucDichVu } from '../danh-muc-dich-vu.model';
import { DanhMucDichVuFormService } from './danh-muc-dich-vu-form.service';

import { DanhMucDichVuUpdateComponent } from './danh-muc-dich-vu-update.component';

describe('DanhMucDichVu Management Update Component', () => {
  let comp: DanhMucDichVuUpdateComponent;
  let fixture: ComponentFixture<DanhMucDichVuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucDichVuFormService: DanhMucDichVuFormService;
  let danhMucDichVuService: DanhMucDichVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucDichVuUpdateComponent],
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
      .overrideTemplate(DanhMucDichVuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucDichVuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucDichVuFormService = TestBed.inject(DanhMucDichVuFormService);
    danhMucDichVuService = TestBed.inject(DanhMucDichVuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucDichVu: IDanhMucDichVu = { id: 456 };

      activatedRoute.data = of({ danhMucDichVu });
      comp.ngOnInit();

      expect(comp.danhMucDichVu).toEqual(danhMucDichVu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDichVu>>();
      const danhMucDichVu = { id: 123 };
      jest.spyOn(danhMucDichVuFormService, 'getDanhMucDichVu').mockReturnValue(danhMucDichVu);
      jest.spyOn(danhMucDichVuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDichVu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDichVu }));
      saveSubject.complete();

      // THEN
      expect(danhMucDichVuFormService.getDanhMucDichVu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucDichVuService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucDichVu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDichVu>>();
      const danhMucDichVu = { id: 123 };
      jest.spyOn(danhMucDichVuFormService, 'getDanhMucDichVu').mockReturnValue({ id: null });
      jest.spyOn(danhMucDichVuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDichVu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucDichVu }));
      saveSubject.complete();

      // THEN
      expect(danhMucDichVuFormService.getDanhMucDichVu).toHaveBeenCalled();
      expect(danhMucDichVuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucDichVu>>();
      const danhMucDichVu = { id: 123 };
      jest.spyOn(danhMucDichVuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucDichVu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucDichVuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
