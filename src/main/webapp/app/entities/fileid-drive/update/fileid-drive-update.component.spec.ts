import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { FileidDriveService } from '../service/fileid-drive.service';
import { IFileidDrive } from '../fileid-drive.model';
import { FileidDriveFormService } from './fileid-drive-form.service';

import { FileidDriveUpdateComponent } from './fileid-drive-update.component';

describe('FileidDrive Management Update Component', () => {
  let comp: FileidDriveUpdateComponent;
  let fixture: ComponentFixture<FileidDriveUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fileidDriveFormService: FileidDriveFormService;
  let fileidDriveService: FileidDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileidDriveUpdateComponent],
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
      .overrideTemplate(FileidDriveUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileidDriveUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fileidDriveFormService = TestBed.inject(FileidDriveFormService);
    fileidDriveService = TestBed.inject(FileidDriveService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fileidDrive: IFileidDrive = { id: 456 };

      activatedRoute.data = of({ fileidDrive });
      comp.ngOnInit();

      expect(comp.fileidDrive).toEqual(fileidDrive);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileidDrive>>();
      const fileidDrive = { id: 123 };
      jest.spyOn(fileidDriveFormService, 'getFileidDrive').mockReturnValue(fileidDrive);
      jest.spyOn(fileidDriveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileidDrive });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileidDrive }));
      saveSubject.complete();

      // THEN
      expect(fileidDriveFormService.getFileidDrive).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fileidDriveService.update).toHaveBeenCalledWith(expect.objectContaining(fileidDrive));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileidDrive>>();
      const fileidDrive = { id: 123 };
      jest.spyOn(fileidDriveFormService, 'getFileidDrive').mockReturnValue({ id: null });
      jest.spyOn(fileidDriveService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileidDrive: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileidDrive }));
      saveSubject.complete();

      // THEN
      expect(fileidDriveFormService.getFileidDrive).toHaveBeenCalled();
      expect(fileidDriveService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileidDrive>>();
      const fileidDrive = { id: 123 };
      jest.spyOn(fileidDriveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileidDrive });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fileidDriveService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
