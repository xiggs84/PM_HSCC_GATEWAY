import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LoaiHopDongCongChungService } from '../service/loai-hop-dong-cong-chung.service';
import { ILoaiHopDongCongChung } from '../loai-hop-dong-cong-chung.model';
import { LoaiHopDongCongChungFormService } from './loai-hop-dong-cong-chung-form.service';

import { LoaiHopDongCongChungUpdateComponent } from './loai-hop-dong-cong-chung-update.component';

describe('LoaiHopDongCongChung Management Update Component', () => {
  let comp: LoaiHopDongCongChungUpdateComponent;
  let fixture: ComponentFixture<LoaiHopDongCongChungUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let loaiHopDongCongChungFormService: LoaiHopDongCongChungFormService;
  let loaiHopDongCongChungService: LoaiHopDongCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoaiHopDongCongChungUpdateComponent],
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
      .overrideTemplate(LoaiHopDongCongChungUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LoaiHopDongCongChungUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loaiHopDongCongChungFormService = TestBed.inject(LoaiHopDongCongChungFormService);
    loaiHopDongCongChungService = TestBed.inject(LoaiHopDongCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const loaiHopDongCongChung: ILoaiHopDongCongChung = { id: 456 };

      activatedRoute.data = of({ loaiHopDongCongChung });
      comp.ngOnInit();

      expect(comp.loaiHopDongCongChung).toEqual(loaiHopDongCongChung);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoaiHopDongCongChung>>();
      const loaiHopDongCongChung = { id: 123 };
      jest.spyOn(loaiHopDongCongChungFormService, 'getLoaiHopDongCongChung').mockReturnValue(loaiHopDongCongChung);
      jest.spyOn(loaiHopDongCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loaiHopDongCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loaiHopDongCongChung }));
      saveSubject.complete();

      // THEN
      expect(loaiHopDongCongChungFormService.getLoaiHopDongCongChung).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(loaiHopDongCongChungService.update).toHaveBeenCalledWith(expect.objectContaining(loaiHopDongCongChung));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoaiHopDongCongChung>>();
      const loaiHopDongCongChung = { id: 123 };
      jest.spyOn(loaiHopDongCongChungFormService, 'getLoaiHopDongCongChung').mockReturnValue({ id: null });
      jest.spyOn(loaiHopDongCongChungService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loaiHopDongCongChung: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: loaiHopDongCongChung }));
      saveSubject.complete();

      // THEN
      expect(loaiHopDongCongChungFormService.getLoaiHopDongCongChung).toHaveBeenCalled();
      expect(loaiHopDongCongChungService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILoaiHopDongCongChung>>();
      const loaiHopDongCongChung = { id: 123 };
      jest.spyOn(loaiHopDongCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ loaiHopDongCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(loaiHopDongCongChungService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
