import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanService } from '../service/danh-muc-tinh-trang-hon-nhan.service';

import danhMucTinhTrangHonNhanResolve from './danh-muc-tinh-trang-hon-nhan-routing-resolve.service';

describe('DanhMucTinhTrangHonNhan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucTinhTrangHonNhanService;
  let resultDanhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan | null | undefined;

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
    service = TestBed.inject(DanhMucTinhTrangHonNhanService);
    resultDanhMucTinhTrangHonNhan = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucTinhTrangHonNhan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucTinhTrangHonNhanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucTinhTrangHonNhan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucTinhTrangHonNhan).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucTinhTrangHonNhanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucTinhTrangHonNhan = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucTinhTrangHonNhan).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucTinhTrangHonNhan>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucTinhTrangHonNhanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucTinhTrangHonNhan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucTinhTrangHonNhan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
