import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucFileUploadKysoService } from '../service/danh-muc-file-upload-kyso.service';
import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';
import { DanhMucFileUploadKysoFormService } from './danh-muc-file-upload-kyso-form.service';

import { DanhMucFileUploadKysoUpdateComponent } from './danh-muc-file-upload-kyso-update.component';

describe('DanhMucFileUploadKyso Management Update Component', () => {
  let comp: DanhMucFileUploadKysoUpdateComponent;
  let fixture: ComponentFixture<DanhMucFileUploadKysoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucFileUploadKysoFormService: DanhMucFileUploadKysoFormService;
  let danhMucFileUploadKysoService: DanhMucFileUploadKysoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucFileUploadKysoUpdateComponent],
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
      .overrideTemplate(DanhMucFileUploadKysoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucFileUploadKysoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucFileUploadKysoFormService = TestBed.inject(DanhMucFileUploadKysoFormService);
    danhMucFileUploadKysoService = TestBed.inject(DanhMucFileUploadKysoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucFileUploadKyso: IDanhMucFileUploadKyso = { id: 456 };

      activatedRoute.data = of({ danhMucFileUploadKyso });
      comp.ngOnInit();

      expect(comp.danhMucFileUploadKyso).toEqual(danhMucFileUploadKyso);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucFileUploadKyso>>();
      const danhMucFileUploadKyso = { id: 123 };
      jest.spyOn(danhMucFileUploadKysoFormService, 'getDanhMucFileUploadKyso').mockReturnValue(danhMucFileUploadKyso);
      jest.spyOn(danhMucFileUploadKysoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucFileUploadKyso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucFileUploadKyso }));
      saveSubject.complete();

      // THEN
      expect(danhMucFileUploadKysoFormService.getDanhMucFileUploadKyso).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucFileUploadKysoService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucFileUploadKyso));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucFileUploadKyso>>();
      const danhMucFileUploadKyso = { id: 123 };
      jest.spyOn(danhMucFileUploadKysoFormService, 'getDanhMucFileUploadKyso').mockReturnValue({ id: null });
      jest.spyOn(danhMucFileUploadKysoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucFileUploadKyso: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucFileUploadKyso }));
      saveSubject.complete();

      // THEN
      expect(danhMucFileUploadKysoFormService.getDanhMucFileUploadKyso).toHaveBeenCalled();
      expect(danhMucFileUploadKysoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucFileUploadKyso>>();
      const danhMucFileUploadKyso = { id: 123 };
      jest.spyOn(danhMucFileUploadKysoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucFileUploadKyso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucFileUploadKysoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
