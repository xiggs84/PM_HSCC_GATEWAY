import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LogDownloadFileDriveService } from '../service/log-download-file-drive.service';
import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import { LogDownloadFileDriveFormService } from './log-download-file-drive-form.service';

import { LogDownloadFileDriveUpdateComponent } from './log-download-file-drive-update.component';

describe('LogDownloadFileDrive Management Update Component', () => {
  let comp: LogDownloadFileDriveUpdateComponent;
  let fixture: ComponentFixture<LogDownloadFileDriveUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logDownloadFileDriveFormService: LogDownloadFileDriveFormService;
  let logDownloadFileDriveService: LogDownloadFileDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogDownloadFileDriveUpdateComponent],
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
      .overrideTemplate(LogDownloadFileDriveUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogDownloadFileDriveUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logDownloadFileDriveFormService = TestBed.inject(LogDownloadFileDriveFormService);
    logDownloadFileDriveService = TestBed.inject(LogDownloadFileDriveService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logDownloadFileDrive: ILogDownloadFileDrive = { id: 456 };

      activatedRoute.data = of({ logDownloadFileDrive });
      comp.ngOnInit();

      expect(comp.logDownloadFileDrive).toEqual(logDownloadFileDrive);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogDownloadFileDrive>>();
      const logDownloadFileDrive = { id: 123 };
      jest.spyOn(logDownloadFileDriveFormService, 'getLogDownloadFileDrive').mockReturnValue(logDownloadFileDrive);
      jest.spyOn(logDownloadFileDriveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logDownloadFileDrive });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logDownloadFileDrive }));
      saveSubject.complete();

      // THEN
      expect(logDownloadFileDriveFormService.getLogDownloadFileDrive).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logDownloadFileDriveService.update).toHaveBeenCalledWith(expect.objectContaining(logDownloadFileDrive));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogDownloadFileDrive>>();
      const logDownloadFileDrive = { id: 123 };
      jest.spyOn(logDownloadFileDriveFormService, 'getLogDownloadFileDrive').mockReturnValue({ id: null });
      jest.spyOn(logDownloadFileDriveService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logDownloadFileDrive: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logDownloadFileDrive }));
      saveSubject.complete();

      // THEN
      expect(logDownloadFileDriveFormService.getLogDownloadFileDrive).toHaveBeenCalled();
      expect(logDownloadFileDriveService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogDownloadFileDrive>>();
      const logDownloadFileDrive = { id: 123 };
      jest.spyOn(logDownloadFileDriveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logDownloadFileDrive });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logDownloadFileDriveService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
