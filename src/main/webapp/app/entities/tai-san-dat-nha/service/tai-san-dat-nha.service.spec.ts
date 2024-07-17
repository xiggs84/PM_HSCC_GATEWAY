import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITaiSanDatNha } from '../tai-san-dat-nha.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tai-san-dat-nha.test-samples';

import { TaiSanDatNhaService, RestTaiSanDatNha } from './tai-san-dat-nha.service';

const requireRestSample: RestTaiSanDatNha = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayBdNganChan: sampleWithRequiredData.ngayBdNganChan?.format(DATE_FORMAT),
  ngayKtNganChan: sampleWithRequiredData.ngayKtNganChan?.format(DATE_FORMAT),
};

describe('TaiSanDatNha Service', () => {
  let service: TaiSanDatNhaService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaiSanDatNha | ITaiSanDatNha[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaiSanDatNhaService);
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

    it('should create a TaiSanDatNha', () => {
      const taiSanDatNha = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taiSanDatNha).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaiSanDatNha', () => {
      const taiSanDatNha = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taiSanDatNha).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaiSanDatNha', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaiSanDatNha', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaiSanDatNha', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaiSanDatNhaToCollectionIfMissing', () => {
      it('should add a TaiSanDatNha to an empty array', () => {
        const taiSanDatNha: ITaiSanDatNha = sampleWithRequiredData;
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing([], taiSanDatNha);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSanDatNha);
      });

      it('should not add a TaiSanDatNha to an array that contains it', () => {
        const taiSanDatNha: ITaiSanDatNha = sampleWithRequiredData;
        const taiSanDatNhaCollection: ITaiSanDatNha[] = [
          {
            ...taiSanDatNha,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing(taiSanDatNhaCollection, taiSanDatNha);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaiSanDatNha to an array that doesn't contain it", () => {
        const taiSanDatNha: ITaiSanDatNha = sampleWithRequiredData;
        const taiSanDatNhaCollection: ITaiSanDatNha[] = [sampleWithPartialData];
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing(taiSanDatNhaCollection, taiSanDatNha);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSanDatNha);
      });

      it('should add only unique TaiSanDatNha to an array', () => {
        const taiSanDatNhaArray: ITaiSanDatNha[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taiSanDatNhaCollection: ITaiSanDatNha[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing(taiSanDatNhaCollection, ...taiSanDatNhaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taiSanDatNha: ITaiSanDatNha = sampleWithRequiredData;
        const taiSanDatNha2: ITaiSanDatNha = sampleWithPartialData;
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing([], taiSanDatNha, taiSanDatNha2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taiSanDatNha);
        expect(expectedResult).toContain(taiSanDatNha2);
      });

      it('should accept null and undefined values', () => {
        const taiSanDatNha: ITaiSanDatNha = sampleWithRequiredData;
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing([], null, taiSanDatNha, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taiSanDatNha);
      });

      it('should return initial array if no TaiSanDatNha is added', () => {
        const taiSanDatNhaCollection: ITaiSanDatNha[] = [sampleWithRequiredData];
        expectedResult = service.addTaiSanDatNhaToCollectionIfMissing(taiSanDatNhaCollection, undefined, null);
        expect(expectedResult).toEqual(taiSanDatNhaCollection);
      });
    });

    describe('compareTaiSanDatNha', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaiSanDatNha(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaiSanDatNha(entity1, entity2);
        const compareResult2 = service.compareTaiSanDatNha(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaiSanDatNha(entity1, entity2);
        const compareResult2 = service.compareTaiSanDatNha(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaiSanDatNha(entity1, entity2);
        const compareResult2 = service.compareTaiSanDatNha(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
