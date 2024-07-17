import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TinhTrangDuongSuService } from '../service/tinh-trang-duong-su.service';
import { ITinhTrangDuongSu } from '../tinh-trang-duong-su.model';
import { TinhTrangDuongSuFormService } from './tinh-trang-duong-su-form.service';

import { TinhTrangDuongSuUpdateComponent } from './tinh-trang-duong-su-update.component';

describe('TinhTrangDuongSu Management Update Component', () => {
  let comp: TinhTrangDuongSuUpdateComponent;
  let fixture: ComponentFixture<TinhTrangDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tinhTrangDuongSuFormService: TinhTrangDuongSuFormService;
  let tinhTrangDuongSuService: TinhTrangDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TinhTrangDuongSuUpdateComponent],
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
      .overrideTemplate(TinhTrangDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TinhTrangDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tinhTrangDuongSuFormService = TestBed.inject(TinhTrangDuongSuFormService);
    tinhTrangDuongSuService = TestBed.inject(TinhTrangDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tinhTrangDuongSu: ITinhTrangDuongSu = { id: 456 };

      activatedRoute.data = of({ tinhTrangDuongSu });
      comp.ngOnInit();

      expect(comp.tinhTrangDuongSu).toEqual(tinhTrangDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITinhTrangDuongSu>>();
      const tinhTrangDuongSu = { id: 123 };
      jest.spyOn(tinhTrangDuongSuFormService, 'getTinhTrangDuongSu').mockReturnValue(tinhTrangDuongSu);
      jest.spyOn(tinhTrangDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tinhTrangDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tinhTrangDuongSu }));
      saveSubject.complete();

      // THEN
      expect(tinhTrangDuongSuFormService.getTinhTrangDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tinhTrangDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(tinhTrangDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITinhTrangDuongSu>>();
      const tinhTrangDuongSu = { id: 123 };
      jest.spyOn(tinhTrangDuongSuFormService, 'getTinhTrangDuongSu').mockReturnValue({ id: null });
      jest.spyOn(tinhTrangDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tinhTrangDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tinhTrangDuongSu }));
      saveSubject.complete();

      // THEN
      expect(tinhTrangDuongSuFormService.getTinhTrangDuongSu).toHaveBeenCalled();
      expect(tinhTrangDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITinhTrangDuongSu>>();
      const tinhTrangDuongSu = { id: 123 };
      jest.spyOn(tinhTrangDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tinhTrangDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tinhTrangDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
