import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucNgoaiTeService } from '../service/danh-muc-ngoai-te.service';
import { IDanhMucNgoaiTe } from '../danh-muc-ngoai-te.model';
import { DanhMucNgoaiTeFormService } from './danh-muc-ngoai-te-form.service';

import { DanhMucNgoaiTeUpdateComponent } from './danh-muc-ngoai-te-update.component';

describe('DanhMucNgoaiTe Management Update Component', () => {
  let comp: DanhMucNgoaiTeUpdateComponent;
  let fixture: ComponentFixture<DanhMucNgoaiTeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucNgoaiTeFormService: DanhMucNgoaiTeFormService;
  let danhMucNgoaiTeService: DanhMucNgoaiTeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNgoaiTeUpdateComponent],
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
      .overrideTemplate(DanhMucNgoaiTeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucNgoaiTeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucNgoaiTeFormService = TestBed.inject(DanhMucNgoaiTeFormService);
    danhMucNgoaiTeService = TestBed.inject(DanhMucNgoaiTeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucNgoaiTe: IDanhMucNgoaiTe = { id: 456 };

      activatedRoute.data = of({ danhMucNgoaiTe });
      comp.ngOnInit();

      expect(comp.danhMucNgoaiTe).toEqual(danhMucNgoaiTe);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNgoaiTe>>();
      const danhMucNgoaiTe = { id: 123 };
      jest.spyOn(danhMucNgoaiTeFormService, 'getDanhMucNgoaiTe').mockReturnValue(danhMucNgoaiTe);
      jest.spyOn(danhMucNgoaiTeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNgoaiTe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNgoaiTe }));
      saveSubject.complete();

      // THEN
      expect(danhMucNgoaiTeFormService.getDanhMucNgoaiTe).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucNgoaiTeService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucNgoaiTe));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNgoaiTe>>();
      const danhMucNgoaiTe = { id: 123 };
      jest.spyOn(danhMucNgoaiTeFormService, 'getDanhMucNgoaiTe').mockReturnValue({ id: null });
      jest.spyOn(danhMucNgoaiTeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNgoaiTe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNgoaiTe }));
      saveSubject.complete();

      // THEN
      expect(danhMucNgoaiTeFormService.getDanhMucNgoaiTe).toHaveBeenCalled();
      expect(danhMucNgoaiTeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNgoaiTe>>();
      const danhMucNgoaiTe = { id: 123 };
      jest.spyOn(danhMucNgoaiTeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNgoaiTe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucNgoaiTeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
