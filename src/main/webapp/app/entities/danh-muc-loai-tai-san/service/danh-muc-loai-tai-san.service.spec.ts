import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiTaiSan } from '../danh-muc-loai-tai-san.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-tai-san.test-samples';

import { DanhMucLoaiTaiSanService } from './danh-muc-loai-tai-san.service';

const requireRestSample: IDanhMucLoaiTaiSan = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiTaiSan Service', () => {
  let service: DanhMucLoaiTaiSanService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiTaiSan | IDanhMucLoaiTaiSan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiTaiSanService);
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

    it('should create a DanhMucLoaiTaiSan', () => {
      const danhMucLoaiTaiSan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiTaiSan', () => {
      const danhMucLoaiTaiSan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiTaiSan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiTaiSan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiTaiSan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiTaiSanToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiTaiSan to an empty array', () => {
        const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing([], danhMucLoaiTaiSan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiTaiSan);
      });

      it('should not add a DanhMucLoaiTaiSan to an array that contains it', () => {
        const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = sampleWithRequiredData;
        const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [
          {
            ...danhMucLoaiTaiSan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing(danhMucLoaiTaiSanCollection, danhMucLoaiTaiSan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiTaiSan to an array that doesn't contain it", () => {
        const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = sampleWithRequiredData;
        const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing(danhMucLoaiTaiSanCollection, danhMucLoaiTaiSan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiTaiSan);
      });

      it('should add only unique DanhMucLoaiTaiSan to an array', () => {
        const danhMucLoaiTaiSanArray: IDanhMucLoaiTaiSan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing(danhMucLoaiTaiSanCollection, ...danhMucLoaiTaiSanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = sampleWithRequiredData;
        const danhMucLoaiTaiSan2: IDanhMucLoaiTaiSan = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing([], danhMucLoaiTaiSan, danhMucLoaiTaiSan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiTaiSan);
        expect(expectedResult).toContain(danhMucLoaiTaiSan2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiTaiSan: IDanhMucLoaiTaiSan = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing([], null, danhMucLoaiTaiSan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiTaiSan);
      });

      it('should return initial array if no DanhMucLoaiTaiSan is added', () => {
        const danhMucLoaiTaiSanCollection: IDanhMucLoaiTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiTaiSanToCollectionIfMissing(danhMucLoaiTaiSanCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiTaiSanCollection);
      });
    });

    describe('compareDanhMucLoaiTaiSan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiTaiSan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiTaiSan(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiTaiSan(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiTaiSan(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
