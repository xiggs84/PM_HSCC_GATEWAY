import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';
import { CauHinhThongTinLoaiTaiSanService } from '../service/cau-hinh-thong-tin-loai-tai-san.service';

import cauHinhThongTinLoaiTaiSanResolve from './cau-hinh-thong-tin-loai-tai-san-routing-resolve.service';

describe('CauHinhThongTinLoaiTaiSan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: CauHinhThongTinLoaiTaiSanService;
  let resultCauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan | null | undefined;

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
    service = TestBed.inject(CauHinhThongTinLoaiTaiSanService);
    resultCauHinhThongTinLoaiTaiSan = undefined;
  });

  describe('resolve', () => {
    it('should return ICauHinhThongTinLoaiTaiSan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhThongTinLoaiTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhThongTinLoaiTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhThongTinLoaiTaiSan).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhThongTinLoaiTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhThongTinLoaiTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCauHinhThongTinLoaiTaiSan).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICauHinhThongTinLoaiTaiSan>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhThongTinLoaiTaiSanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhThongTinLoaiTaiSan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhThongTinLoaiTaiSan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
