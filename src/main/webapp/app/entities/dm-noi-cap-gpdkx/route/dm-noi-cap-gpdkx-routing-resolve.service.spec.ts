import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';
import { DmNoiCapGpdkxService } from '../service/dm-noi-cap-gpdkx.service';

import dmNoiCapGpdkxResolve from './dm-noi-cap-gpdkx-routing-resolve.service';

describe('DmNoiCapGpdkx routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DmNoiCapGpdkxService;
  let resultDmNoiCapGpdkx: IDmNoiCapGpdkx | null | undefined;

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
    service = TestBed.inject(DmNoiCapGpdkxService);
    resultDmNoiCapGpdkx = undefined;
  });

  describe('resolve', () => {
    it('should return IDmNoiCapGpdkx returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmNoiCapGpdkxResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmNoiCapGpdkx = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDmNoiCapGpdkx).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmNoiCapGpdkxResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmNoiCapGpdkx = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDmNoiCapGpdkx).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDmNoiCapGpdkx>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        dmNoiCapGpdkxResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDmNoiCapGpdkx = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDmNoiCapGpdkx).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
