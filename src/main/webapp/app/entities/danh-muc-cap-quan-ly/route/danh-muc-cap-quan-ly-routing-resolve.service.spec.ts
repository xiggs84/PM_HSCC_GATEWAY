import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';
import { DanhMucCapQuanLyService } from '../service/danh-muc-cap-quan-ly.service';

import danhMucCapQuanLyResolve from './danh-muc-cap-quan-ly-routing-resolve.service';

describe('DanhMucCapQuanLy routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucCapQuanLyService;
  let resultDanhMucCapQuanLy: IDanhMucCapQuanLy | null | undefined;

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
    service = TestBed.inject(DanhMucCapQuanLyService);
    resultDanhMucCapQuanLy = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucCapQuanLy returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucCapQuanLyResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucCapQuanLy = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucCapQuanLy).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucCapQuanLyResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucCapQuanLy = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucCapQuanLy).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucCapQuanLy>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucCapQuanLyResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucCapQuanLy = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucCapQuanLy).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
