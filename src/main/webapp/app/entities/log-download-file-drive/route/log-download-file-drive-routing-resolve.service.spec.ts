import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import { LogDownloadFileDriveService } from '../service/log-download-file-drive.service';

import logDownloadFileDriveResolve from './log-download-file-drive-routing-resolve.service';

describe('LogDownloadFileDrive routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LogDownloadFileDriveService;
  let resultLogDownloadFileDrive: ILogDownloadFileDrive | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(LogDownloadFileDriveService);
    resultLogDownloadFileDrive = undefined;
  });

  describe('resolve', () => {
    it('should return ILogDownloadFileDrive returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logDownloadFileDriveResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogDownloadFileDrive = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogDownloadFileDrive).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        logDownloadFileDriveResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogDownloadFileDrive = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLogDownloadFileDrive).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILogDownloadFileDrive>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logDownloadFileDriveResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogDownloadFileDrive = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogDownloadFileDrive).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
