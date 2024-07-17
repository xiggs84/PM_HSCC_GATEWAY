import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITinhTrangTaiSan } from '../tinh-trang-tai-san.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tinh-trang-tai-san.test-samples';

import { TinhTrangTaiSanService } from './tinh-trang-tai-san.service';

const requireRestSample: ITinhTrangTaiSan = {
  ...sampleWithRequiredData,
};

describe('TinhTrangTaiSan Service', () => {
  let service: TinhTrangTaiSanService;
  let httpMock: HttpTestingController;
  let expectedResult: ITinhTrangTaiSan | ITinhTrangTaiSan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TinhTrangTaiSanService);
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

    it('should create a TinhTrangTaiSan', () => {
      const tinhTrangTaiSan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tinhTrangTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TinhTrangTaiSan', () => {
      const tinhTrangTaiSan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tinhTrangTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TinhTrangTaiSan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TinhTrangTaiSan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TinhTrangTaiSan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTinhTrangTaiSanToCollectionIfMissing', () => {
      it('should add a TinhTrangTaiSan to an empty array', () => {
        const tinhTrangTaiSan: ITinhTrangTaiSan = sampleWithRequiredData;
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing([], tinhTrangTaiSan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tinhTrangTaiSan);
      });

      it('should not add a TinhTrangTaiSan to an array that contains it', () => {
        const tinhTrangTaiSan: ITinhTrangTaiSan = sampleWithRequiredData;
        const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [
          {
            ...tinhTrangTaiSan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing(tinhTrangTaiSanCollection, tinhTrangTaiSan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TinhTrangTaiSan to an array that doesn't contain it", () => {
        const tinhTrangTaiSan: ITinhTrangTaiSan = sampleWithRequiredData;
        const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [sampleWithPartialData];
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing(tinhTrangTaiSanCollection, tinhTrangTaiSan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tinhTrangTaiSan);
      });

      it('should add only unique TinhTrangTaiSan to an array', () => {
        const tinhTrangTaiSanArray: ITinhTrangTaiSan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing(tinhTrangTaiSanCollection, ...tinhTrangTaiSanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tinhTrangTaiSan: ITinhTrangTaiSan = sampleWithRequiredData;
        const tinhTrangTaiSan2: ITinhTrangTaiSan = sampleWithPartialData;
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing([], tinhTrangTaiSan, tinhTrangTaiSan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tinhTrangTaiSan);
        expect(expectedResult).toContain(tinhTrangTaiSan2);
      });

      it('should accept null and undefined values', () => {
        const tinhTrangTaiSan: ITinhTrangTaiSan = sampleWithRequiredData;
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing([], null, tinhTrangTaiSan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tinhTrangTaiSan);
      });

      it('should return initial array if no TinhTrangTaiSan is added', () => {
        const tinhTrangTaiSanCollection: ITinhTrangTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addTinhTrangTaiSanToCollectionIfMissing(tinhTrangTaiSanCollection, undefined, null);
        expect(expectedResult).toEqual(tinhTrangTaiSanCollection);
      });
    });

    describe('compareTinhTrangTaiSan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTinhTrangTaiSan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTinhTrangTaiSan(entity1, entity2);
        const compareResult2 = service.compareTinhTrangTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTinhTrangTaiSan(entity1, entity2);
        const compareResult2 = service.compareTinhTrangTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTinhTrangTaiSan(entity1, entity2);
        const compareResult2 = service.compareTinhTrangTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
