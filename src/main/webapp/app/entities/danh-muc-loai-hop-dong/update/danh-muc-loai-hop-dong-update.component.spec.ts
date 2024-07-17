import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiHopDongService } from '../service/danh-muc-loai-hop-dong.service';
import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongFormService } from './danh-muc-loai-hop-dong-form.service';

import { DanhMucLoaiHopDongUpdateComponent } from './danh-muc-loai-hop-dong-update.component';

describe('DanhMucLoaiHopDong Management Update Component', () => {
  let comp: DanhMucLoaiHopDongUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiHopDongFormService: DanhMucLoaiHopDongFormService;
  let danhMucLoaiHopDongService: DanhMucLoaiHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiHopDongUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiHopDongFormService = TestBed.inject(DanhMucLoaiHopDongFormService);
    danhMucLoaiHopDongService = TestBed.inject(DanhMucLoaiHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiHopDong: IDanhMucLoaiHopDong = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      expect(comp.danhMucLoaiHopDong).toEqual(danhMucLoaiHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiHopDong>>();
      const danhMucLoaiHopDong = { id: 123 };
      jest.spyOn(danhMucLoaiHopDongFormService, 'getDanhMucLoaiHopDong').mockReturnValue(danhMucLoaiHopDong);
      jest.spyOn(danhMucLoaiHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiHopDongFormService.getDanhMucLoaiHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiHopDong>>();
      const danhMucLoaiHopDong = { id: 123 };
      jest.spyOn(danhMucLoaiHopDongFormService, 'getDanhMucLoaiHopDong').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiHopDongFormService.getDanhMucLoaiHopDong).toHaveBeenCalled();
      expect(danhMucLoaiHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiHopDong>>();
      const danhMucLoaiHopDong = { id: 123 };
      jest.spyOn(danhMucLoaiHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
