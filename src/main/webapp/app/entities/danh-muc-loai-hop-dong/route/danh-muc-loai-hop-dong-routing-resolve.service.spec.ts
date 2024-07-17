import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import { DanhMucLoaiHopDongService } from '../service/danh-muc-loai-hop-dong.service';

import danhMucLoaiHopDongResolve from './danh-muc-loai-hop-dong-routing-resolve.service';

describe('DanhMucLoaiHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiHopDongService;
  let resultDanhMucLoaiHopDong: IDanhMucLoaiHopDong | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiHopDongService);
    resultDanhMucLoaiHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiHopDong).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
