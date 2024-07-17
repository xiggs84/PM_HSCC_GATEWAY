import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucNhomHopDongService } from '../service/danh-muc-nhom-hop-dong.service';
import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';
import { DanhMucNhomHopDongFormService } from './danh-muc-nhom-hop-dong-form.service';

import { DanhMucNhomHopDongUpdateComponent } from './danh-muc-nhom-hop-dong-update.component';

describe('DanhMucNhomHopDong Management Update Component', () => {
  let comp: DanhMucNhomHopDongUpdateComponent;
  let fixture: ComponentFixture<DanhMucNhomHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucNhomHopDongFormService: DanhMucNhomHopDongFormService;
  let danhMucNhomHopDongService: DanhMucNhomHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNhomHopDongUpdateComponent],
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
      .overrideTemplate(DanhMucNhomHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucNhomHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucNhomHopDongFormService = TestBed.inject(DanhMucNhomHopDongFormService);
    danhMucNhomHopDongService = TestBed.inject(DanhMucNhomHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucNhomHopDong: IDanhMucNhomHopDong = { id: 456 };

      activatedRoute.data = of({ danhMucNhomHopDong });
      comp.ngOnInit();

      expect(comp.danhMucNhomHopDong).toEqual(danhMucNhomHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNhomHopDong>>();
      const danhMucNhomHopDong = { id: 123 };
      jest.spyOn(danhMucNhomHopDongFormService, 'getDanhMucNhomHopDong').mockReturnValue(danhMucNhomHopDong);
      jest.spyOn(danhMucNhomHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNhomHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNhomHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhMucNhomHopDongFormService.getDanhMucNhomHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucNhomHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucNhomHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNhomHopDong>>();
      const danhMucNhomHopDong = { id: 123 };
      jest.spyOn(danhMucNhomHopDongFormService, 'getDanhMucNhomHopDong').mockReturnValue({ id: null });
      jest.spyOn(danhMucNhomHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNhomHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNhomHopDong }));
      saveSubject.complete();

      // THEN
      expect(danhMucNhomHopDongFormService.getDanhMucNhomHopDong).toHaveBeenCalled();
      expect(danhMucNhomHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNhomHopDong>>();
      const danhMucNhomHopDong = { id: 123 };
      jest.spyOn(danhMucNhomHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNhomHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucNhomHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
