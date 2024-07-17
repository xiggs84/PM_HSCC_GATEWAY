import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiVanBanService } from '../service/danh-muc-loai-van-ban.service';
import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';
import { DanhMucLoaiVanBanFormService } from './danh-muc-loai-van-ban-form.service';

import { DanhMucLoaiVanBanUpdateComponent } from './danh-muc-loai-van-ban-update.component';

describe('DanhMucLoaiVanBan Management Update Component', () => {
  let comp: DanhMucLoaiVanBanUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiVanBanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiVanBanFormService: DanhMucLoaiVanBanFormService;
  let danhMucLoaiVanBanService: DanhMucLoaiVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiVanBanUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiVanBanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiVanBanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiVanBanFormService = TestBed.inject(DanhMucLoaiVanBanFormService);
    danhMucLoaiVanBanService = TestBed.inject(DanhMucLoaiVanBanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiVanBan: IDanhMucLoaiVanBan = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiVanBan });
      comp.ngOnInit();

      expect(comp.danhMucLoaiVanBan).toEqual(danhMucLoaiVanBan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiVanBan>>();
      const danhMucLoaiVanBan = { id: 123 };
      jest.spyOn(danhMucLoaiVanBanFormService, 'getDanhMucLoaiVanBan').mockReturnValue(danhMucLoaiVanBan);
      jest.spyOn(danhMucLoaiVanBanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiVanBan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiVanBan }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiVanBanFormService.getDanhMucLoaiVanBan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiVanBanService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiVanBan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiVanBan>>();
      const danhMucLoaiVanBan = { id: 123 };
      jest.spyOn(danhMucLoaiVanBanFormService, 'getDanhMucLoaiVanBan').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiVanBanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiVanBan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiVanBan }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiVanBanFormService.getDanhMucLoaiVanBan).toHaveBeenCalled();
      expect(danhMucLoaiVanBanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiVanBan>>();
      const danhMucLoaiVanBan = { id: 123 };
      jest.spyOn(danhMucLoaiVanBanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiVanBan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiVanBanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
