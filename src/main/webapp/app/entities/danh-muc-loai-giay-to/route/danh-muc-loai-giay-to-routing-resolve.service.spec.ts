import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';
import { DanhMucLoaiGiayToService } from '../service/danh-muc-loai-giay-to.service';

import danhMucLoaiGiayToResolve from './danh-muc-loai-giay-to-routing-resolve.service';

describe('DanhMucLoaiGiayTo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiGiayToService;
  let resultDanhMucLoaiGiayTo: IDanhMucLoaiGiayTo | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiGiayToService);
    resultDanhMucLoaiGiayTo = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiGiayTo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiGiayToResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiGiayTo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiGiayTo).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiGiayToResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiGiayTo = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiGiayTo).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiGiayTo>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiGiayToResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiGiayTo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiGiayTo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
