import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { PhanLoaiHopDongService } from '../service/phan-loai-hop-dong.service';
import { IPhanLoaiHopDong } from '../phan-loai-hop-dong.model';
import { PhanLoaiHopDongFormService } from './phan-loai-hop-dong-form.service';

import { PhanLoaiHopDongUpdateComponent } from './phan-loai-hop-dong-update.component';

describe('PhanLoaiHopDong Management Update Component', () => {
  let comp: PhanLoaiHopDongUpdateComponent;
  let fixture: ComponentFixture<PhanLoaiHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let phanLoaiHopDongFormService: PhanLoaiHopDongFormService;
  let phanLoaiHopDongService: PhanLoaiHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhanLoaiHopDongUpdateComponent],
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
      .overrideTemplate(PhanLoaiHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhanLoaiHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    phanLoaiHopDongFormService = TestBed.inject(PhanLoaiHopDongFormService);
    phanLoaiHopDongService = TestBed.inject(PhanLoaiHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const phanLoaiHopDong: IPhanLoaiHopDong = { id: 456 };

      activatedRoute.data = of({ phanLoaiHopDong });
      comp.ngOnInit();

      expect(comp.phanLoaiHopDong).toEqual(phanLoaiHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPhanLoaiHopDong>>();
      const phanLoaiHopDong = { id: 123 };
      jest.spyOn(phanLoaiHopDongFormService, 'getPhanLoaiHopDong').mockReturnValue(phanLoaiHopDong);
      jest.spyOn(phanLoaiHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanLoaiHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: phanLoaiHopDong }));
      saveSubject.complete();

      // THEN
      expect(phanLoaiHopDongFormService.getPhanLoaiHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(phanLoaiHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(phanLoaiHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPhanLoaiHopDong>>();
      const phanLoaiHopDong = { id: 123 };
      jest.spyOn(phanLoaiHopDongFormService, 'getPhanLoaiHopDong').mockReturnValue({ id: null });
      jest.spyOn(phanLoaiHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanLoaiHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: phanLoaiHopDong }));
      saveSubject.complete();

      // THEN
      expect(phanLoaiHopDongFormService.getPhanLoaiHopDong).toHaveBeenCalled();
      expect(phanLoaiHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPhanLoaiHopDong>>();
      const phanLoaiHopDong = { id: 123 };
      jest.spyOn(phanLoaiHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ phanLoaiHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(phanLoaiHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
