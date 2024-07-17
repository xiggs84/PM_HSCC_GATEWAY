import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';
import { DanhMucDauSoCmndService } from '../service/danh-muc-dau-so-cmnd.service';

import danhMucDauSoCmndResolve from './danh-muc-dau-so-cmnd-routing-resolve.service';

describe('DanhMucDauSoCmnd routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucDauSoCmndService;
  let resultDanhMucDauSoCmnd: IDanhMucDauSoCmnd | null | undefined;

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
    service = TestBed.inject(DanhMucDauSoCmndService);
    resultDanhMucDauSoCmnd = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucDauSoCmnd returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucDauSoCmndResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucDauSoCmnd = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucDauSoCmnd).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucDauSoCmndResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucDauSoCmnd = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucDauSoCmnd).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucDauSoCmnd>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucDauSoCmndResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucDauSoCmnd = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucDauSoCmnd).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});