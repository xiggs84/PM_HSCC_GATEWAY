import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITaiSan } from '../tai-san.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tai-san.test-samples';

import { TaiSanService, RestTaiSan } from './tai-san.service';

const requireRestSample: RestTaiSan = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayBdNganChan: sampleWithRequiredData.ngayBdNganChan?.format(DATE_FORMAT),
  ngayKtNganChan: sampleWithRequiredData.ngayKtNganChan?.format(DATE_FORMAT),
};

describe('TaiSan Service', () => {
  let service: TaiSanService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaiSan | ITaiSan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaiSanService);
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

    it('should create a TaiSan', () => {
      const taiSan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaiSan', () => {
      const taiSan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaiSan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaiSan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaiSan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaiSanToCollectionIfMissing', () => {
      it('should add a TaiSan to an empty array', () => {
        const taiSan: ITaiSan = sampleWithRequiredData;
        expectedResult = service.addTaiSanToCollectionIfMissing([], taiSan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSan);
      });

      it('should not add a TaiSan to an array that contains it', () => {
        const taiSan: ITaiSan = sampleWithRequiredData;
        const taiSanCollection: ITaiSan[] = [
          {
            ...taiSan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaiSanToCollectionIfMissing(taiSanCollection, taiSan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaiSan to an array that doesn't contain it", () => {
        const taiSan: ITaiSan = sampleWithRequiredData;
        const taiSanCollection: ITaiSan[] = [sampleWithPartialData];
        expectedResult = service.addTaiSanToCollectionIfMissing(taiSanCollection, taiSan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSan);
      });

      it('should add only unique TaiSan to an array', () => {
        const taiSanArray: ITaiSan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taiSanCollection: ITaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanToCollectionIfMissing(taiSanCollection, ...taiSanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taiSan: ITaiSan = sampleWithRequiredData;
        const taiSan2: ITaiSan = sampleWithPartialData;
        expectedResult = service.addTaiSanToCollectionIfMissing([], taiSan, taiSan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSan);
        expect(expectedResult).toContain(taiSan2);
      });

      it('should accept null and undefined values', () => {
        const taiSan: ITaiSan = sampleWithRequiredData;
        expectedResult = service.addTaiSanToCollectionIfMissing([], null, taiSan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSan);
      });

      it('should return initial array if no TaiSan is added', () => {
        const taiSanCollection: ITaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanToCollectionIfMissing(taiSanCollection, undefined, null);
        expect(expectedResult).toEqual(taiSanCollection);
      });
    });

    describe('compareTaiSan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaiSan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaiSan(entity1, entity2);
        const compareResult2 = service.compareTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaiSan(entity1, entity2);
        const compareResult2 = service.compareTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaiSan(entity1, entity2);
        const compareResult2 = service.compareTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
