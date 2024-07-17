import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhsachDsNganchanTmpService } from '../service/danhsach-ds-nganchan-tmp.service';
import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import { DanhsachDsNganchanTmpFormService } from './danhsach-ds-nganchan-tmp-form.service';

import { DanhsachDsNganchanTmpUpdateComponent } from './danhsach-ds-nganchan-tmp-update.component';

describe('DanhsachDsNganchanTmp Management Update Component', () => {
  let comp: DanhsachDsNganchanTmpUpdateComponent;
  let fixture: ComponentFixture<DanhsachDsNganchanTmpUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhsachDsNganchanTmpFormService: DanhsachDsNganchanTmpFormService;
  let danhsachDsNganchanTmpService: DanhsachDsNganchanTmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhsachDsNganchanTmpUpdateComponent],
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
      .overrideTemplate(DanhsachDsNganchanTmpUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhsachDsNganchanTmpUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhsachDsNganchanTmpFormService = TestBed.inject(DanhsachDsNganchanTmpFormService);
    danhsachDsNganchanTmpService = TestBed.inject(DanhsachDsNganchanTmpService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhsachDsNganchanTmp: IDanhsachDsNganchanTmp = { id: 456 };

      activatedRoute.data = of({ danhsachDsNganchanTmp });
      comp.ngOnInit();

      expect(comp.danhsachDsNganchanTmp).toEqual(danhsachDsNganchanTmp);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhsachDsNganchanTmp>>();
      const danhsachDsNganchanTmp = { id: 123 };
      jest.spyOn(danhsachDsNganchanTmpFormService, 'getDanhsachDsNganchanTmp').mockReturnValue(danhsachDsNganchanTmp);
      jest.spyOn(danhsachDsNganchanTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhsachDsNganchanTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhsachDsNganchanTmp }));
      saveSubject.complete();

      // THEN
      expect(danhsachDsNganchanTmpFormService.getDanhsachDsNganchanTmp).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhsachDsNganchanTmpService.update).toHaveBeenCalledWith(expect.objectContaining(danhsachDsNganchanTmp));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhsachDsNganchanTmp>>();
      const danhsachDsNganchanTmp = { id: 123 };
      jest.spyOn(danhsachDsNganchanTmpFormService, 'getDanhsachDsNganchanTmp').mockReturnValue({ id: null });
      jest.spyOn(danhsachDsNganchanTmpService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhsachDsNganchanTmp: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhsachDsNganchanTmp }));
      saveSubject.complete();

      // THEN
      expect(danhsachDsNganchanTmpFormService.getDanhsachDsNganchanTmp).toHaveBeenCalled();
      expect(danhsachDsNganchanTmpService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhsachDsNganchanTmp>>();
      const danhsachDsNganchanTmp = { id: 123 };
      jest.spyOn(danhsachDsNganchanTmpService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhsachDsNganchanTmp });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhsachDsNganchanTmpService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
