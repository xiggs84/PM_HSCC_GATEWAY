import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IVanBan } from '../van-ban.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../van-ban.test-samples';

import { VanBanService, RestVanBan } from './van-ban.service';

const requireRestSample: RestVanBan = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('VanBan Service', () => {
  let service: VanBanService;
  let httpMock: HttpTestingController;
  let expectedResult: IVanBan | IVanBan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(VanBanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a VanBan', () => {
      const vanBan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(vanBan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VanBan', () => {
      const vanBan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(vanBan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VanBan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VanBan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VanBan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVanBanToCollectionIfMissing', () => {
      it('should add a VanBan to an empty array', () => {
        const vanBan: IVanBan = sampleWithRequiredData;
        expectedResult = service.addVanBanToCollectionIfMissing([], vanBan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vanBan);
      });

      it('should not add a VanBan to an array that contains it', () => {
        const vanBan: IVanBan = sampleWithRequiredData;
        const vanBanCollection: IVanBan[] = [
          {
            ...vanBan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVanBanToCollectionIfMissing(vanBanCollection, vanBan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VanBan to an array that doesn't contain it", () => {
        const vanBan: IVanBan = sampleWithRequiredData;
        const vanBanCollection: IVanBan[] = [sampleWithPartialData];
        expectedResult = service.addVanBanToCollectionIfMissing(vanBanCollection, vanBan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vanBan);
      });

      it('should add only unique VanBan to an array', () => {
        const vanBanArray: IVanBan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const vanBanCollection: IVanBan[] = [sampleWithRequiredData];
        expectedResult = service.addVanBanToCollectionIfMissing(vanBanCollection, ...vanBanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vanBan: IVanBan = sampleWithRequiredData;
        const vanBan2: IVanBan = sampleWithPartialData;
        expectedResult = service.addVanBanToCollectionIfMissing([], vanBan, vanBan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vanBan);
        expect(expectedResult).toContain(vanBan2);
      });

      it('should accept null and undefined values', () => {
        const vanBan: IVanBan = sampleWithRequiredData;
        expectedResult = service.addVanBanToCollectionIfMissing([], null, vanBan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vanBan);
      });

      it('should return initial array if no VanBan is added', () => {
        const vanBanCollection: IVanBan[] = [sampleWithRequiredData];
        expectedResult = service.addVanBanToCollectionIfMissing(vanBanCollection, undefined, null);
        expect(expectedResult).toEqual(vanBanCollection);
      });
    });

    describe('compareVanBan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVanBan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVanBan(entity1, entity2);
        const compareResult2 = service.compareVanBan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVanBan(entity1, entity2);
        const compareResult2 = service.compareVanBan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVanBan(entity1, entity2);
        const compareResult2 = service.compareVanBan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
