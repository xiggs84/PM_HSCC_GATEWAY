import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucFileUploadKyso } from '../danh-muc-file-upload-kyso.model';
import { DanhMucFileUploadKysoService } from '../service/danh-muc-file-upload-kyso.service';

import danhMucFileUploadKysoResolve from './danh-muc-file-upload-kyso-routing-resolve.service';

describe('DanhMucFileUploadKyso routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucFileUploadKysoService;
  let resultDanhMucFileUploadKyso: IDanhMucFileUploadKyso | null | undefined;

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
    service = TestBed.inject(DanhMucFileUploadKysoService);
    resultDanhMucFileUploadKyso = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucFileUploadKyso returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucFileUploadKysoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucFileUploadKyso = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucFileUploadKyso).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucFileUploadKysoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucFileUploadKyso = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucFileUploadKyso).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucFileUploadKyso>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucFileUploadKysoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucFileUploadKyso = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucFileUploadKyso).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
