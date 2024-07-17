import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CauHinhHoaDonDienTuService } from '../service/cau-hinh-hoa-don-dien-tu.service';
import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import { CauHinhHoaDonDienTuFormService } from './cau-hinh-hoa-don-dien-tu-form.service';

import { CauHinhHoaDonDienTuUpdateComponent } from './cau-hinh-hoa-don-dien-tu-update.component';

describe('CauHinhHoaDonDienTu Management Update Component', () => {
  let comp: CauHinhHoaDonDienTuUpdateComponent;
  let fixture: ComponentFixture<CauHinhHoaDonDienTuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhHoaDonDienTuFormService: CauHinhHoaDonDienTuFormService;
  let cauHinhHoaDonDienTuService: CauHinhHoaDonDienTuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhHoaDonDienTuUpdateComponent],
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
      .overrideTemplate(CauHinhHoaDonDienTuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhHoaDonDienTuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhHoaDonDienTuFormService = TestBed.inject(CauHinhHoaDonDienTuFormService);
    cauHinhHoaDonDienTuService = TestBed.inject(CauHinhHoaDonDienTuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu = { id: 456 };

      activatedRoute.data = of({ cauHinhHoaDonDienTu });
      comp.ngOnInit();

      expect(comp.cauHinhHoaDonDienTu).toEqual(cauHinhHoaDonDienTu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhHoaDonDienTu>>();
      const cauHinhHoaDonDienTu = { id: 123 };
      jest.spyOn(cauHinhHoaDonDienTuFormService, 'getCauHinhHoaDonDienTu').mockReturnValue(cauHinhHoaDonDienTu);
      jest.spyOn(cauHinhHoaDonDienTuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhHoaDonDienTu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhHoaDonDienTu }));
      saveSubject.complete();

      // THEN
      expect(cauHinhHoaDonDienTuFormService.getCauHinhHoaDonDienTu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhHoaDonDienTuService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhHoaDonDienTu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhHoaDonDienTu>>();
      const cauHinhHoaDonDienTu = { id: 123 };
      jest.spyOn(cauHinhHoaDonDienTuFormService, 'getCauHinhHoaDonDienTu').mockReturnValue({ id: null });
      jest.spyOn(cauHinhHoaDonDienTuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhHoaDonDienTu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhHoaDonDienTu }));
      saveSubject.complete();

      // THEN
      expect(cauHinhHoaDonDienTuFormService.getCauHinhHoaDonDienTu).toHaveBeenCalled();
      expect(cauHinhHoaDonDienTuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhHoaDonDienTu>>();
      const cauHinhHoaDonDienTu = { id: 123 };
      jest.spyOn(cauHinhHoaDonDienTuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhHoaDonDienTu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhHoaDonDienTuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
