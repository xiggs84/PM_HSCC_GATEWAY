import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';
import { DanhMucLoaiTaiSanService } from '../service/danh-muc-loai-tai-san.service';

import danhMucLoaiTaiSanResolve from './danh-muc-loai-tai-san-routing-resolve.service';

describe('DanhMucLoaiTaiSan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiTaiSanService;
  let resultDanhMucLoaiTaiSan: IDanhMucLoaiTaiSan | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiTaiSanService);
    resultDanhMucLoaiTaiSan = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiTaiSan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiTaiSan).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiTaiSan).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiTaiSan>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiTaiSan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
