import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';
import { DanhMucLoaiDonViService } from '../service/danh-muc-loai-don-vi.service';

import danhMucLoaiDonViResolve from './danh-muc-loai-don-vi-routing-resolve.service';

describe('DanhMucLoaiDonVi routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucLoaiDonViService;
  let resultDanhMucLoaiDonVi: IDanhMucLoaiDonVi | null | undefined;

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
    service = TestBed.inject(DanhMucLoaiDonViService);
    resultDanhMucLoaiDonVi = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucLoaiDonVi returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiDonViResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiDonVi = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiDonVi).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiDonViResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiDonVi = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucLoaiDonVi).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucLoaiDonVi>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucLoaiDonViResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucLoaiDonVi = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucLoaiDonVi).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
