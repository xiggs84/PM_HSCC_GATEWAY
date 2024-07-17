import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';
import { DanhMucLoaiVanBanService } from '../service/danh-muc-loai-van-ban.service';

import danhMucLoaiVanBanResolve from './danh-muc-loai-van-ban-routing-resolve.service';

describe('DanhMucLoaiVanBan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiVanBanService;
  let resultDanhMucLoaiVanBan: IDanhMucLoaiVanBan | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiVanBanService);
    resultDanhMucLoaiVanBan = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiVanBan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiVanBanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiVanBan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiVanBan).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiVanBanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiVanBan = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiVanBan).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiVanBan>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiVanBanResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiVanBan = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiVanBan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
