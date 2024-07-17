import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITaiSanDuongSu } from '../tai-san-duong-su.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tai-san-duong-su.test-samples';

import { TaiSanDuongSuService, RestTaiSanDuongSu } from './tai-san-duong-su.service';

const requireRestSample: RestTaiSanDuongSu = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('TaiSanDuongSu Service', () => {
  let service: TaiSanDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaiSanDuongSu | ITaiSanDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaiSanDuongSuService);
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

    it('should create a TaiSanDuongSu', () => {
      const taiSanDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taiSanDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaiSanDuongSu', () => {
      const taiSanDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taiSanDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaiSanDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaiSanDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaiSanDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaiSanDuongSuToCollectionIfMissing', () => {
      it('should add a TaiSanDuongSu to an empty array', () => {
        const taiSanDuongSu: ITaiSanDuongSu = sampleWithRequiredData;
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing([], taiSanDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSanDuongSu);
      });

      it('should not add a TaiSanDuongSu to an array that contains it', () => {
        const taiSanDuongSu: ITaiSanDuongSu = sampleWithRequiredData;
        const taiSanDuongSuCollection: ITaiSanDuongSu[] = [
          {
            ...taiSanDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing(taiSanDuongSuCollection, taiSanDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaiSanDuongSu to an array that doesn't contain it", () => {
        const taiSanDuongSu: ITaiSanDuongSu = sampleWithRequiredData;
        const taiSanDuongSuCollection: ITaiSanDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing(taiSanDuongSuCollection, taiSanDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSanDuongSu);
      });

      it('should add only unique TaiSanDuongSu to an array', () => {
        const taiSanDuongSuArray: ITaiSanDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taiSanDuongSuCollection: ITaiSanDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing(taiSanDuongSuCollection, ...taiSanDuongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taiSanDuongSu: ITaiSanDuongSu = sampleWithRequiredData;
        const taiSanDuongSu2: ITaiSanDuongSu = sampleWithPartialData;
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing([], taiSanDuongSu, taiSanDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSanDuongSu);
        expect(expectedResult).toContain(taiSanDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const taiSanDuongSu: ITaiSanDuongSu = sampleWithRequiredData;
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing([], null, taiSanDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSanDuongSu);
      });

      it('should return initial array if no TaiSanDuongSu is added', () => {
        const taiSanDuongSuCollection: ITaiSanDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanDuongSuToCollectionIfMissing(taiSanDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(taiSanDuongSuCollection);
      });
    });

    describe('compareTaiSanDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaiSanDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaiSanDuongSu(entity1, entity2);
        const compareResult2 = service.compareTaiSanDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaiSanDuongSu(entity1, entity2);
        const compareResult2 = service.compareTaiSanDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaiSanDuongSu(entity1, entity2);
        const compareResult2 = service.compareTaiSanDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
