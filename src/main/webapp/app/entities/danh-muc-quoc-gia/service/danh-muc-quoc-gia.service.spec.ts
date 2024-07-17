import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucQuocGia } from '../danh-muc-quoc-gia.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-quoc-gia.test-samples';

import { DanhMucQuocGiaService } from './danh-muc-quoc-gia.service';

const requireRestSample: IDanhMucQuocGia = {
  ...sampleWithRequiredData,
};

describe('DanhMucQuocGia Service', () => {
  let service: DanhMucQuocGiaService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucQuocGia | IDanhMucQuocGia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucQuocGiaService);
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

    it('should create a DanhMucQuocGia', () => {
      const danhMucQuocGia = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucQuocGia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucQuocGia', () => {
      const danhMucQuocGia = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucQuocGia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucQuocGia', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucQuocGia', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucQuocGia', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucQuocGiaToCollectionIfMissing', () => {
      it('should add a DanhMucQuocGia to an empty array', () => {
        const danhMucQuocGia: IDanhMucQuocGia = sampleWithRequiredData;
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing([], danhMucQuocGia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucQuocGia);
      });

      it('should not add a DanhMucQuocGia to an array that contains it', () => {
        const danhMucQuocGia: IDanhMucQuocGia = sampleWithRequiredData;
        const danhMucQuocGiaCollection: IDanhMucQuocGia[] = [
          {
            ...danhMucQuocGia,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing(danhMucQuocGiaCollection, danhMucQuocGia);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucQuocGia to an array that doesn't contain it", () => {
        const danhMucQuocGia: IDanhMucQuocGia = sampleWithRequiredData;
        const danhMucQuocGiaCollection: IDanhMucQuocGia[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing(danhMucQuocGiaCollection, danhMucQuocGia);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucQuocGia);
      });

      it('should add only unique DanhMucQuocGia to an array', () => {
        const danhMucQuocGiaArray: IDanhMucQuocGia[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucQuocGiaCollection: IDanhMucQuocGia[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing(danhMucQuocGiaCollection, ...danhMucQuocGiaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucQuocGia: IDanhMucQuocGia = sampleWithRequiredData;
        const danhMucQuocGia2: IDanhMucQuocGia = sampleWithPartialData;
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing([], danhMucQuocGia, danhMucQuocGia2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucQuocGia);
        expect(expectedResult).toContain(danhMucQuocGia2);
      });

      it('should accept null and undefined values', () => {
        const danhMucQuocGia: IDanhMucQuocGia = sampleWithRequiredData;
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing([], null, danhMucQuocGia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucQuocGia);
      });

      it('should return initial array if no DanhMucQuocGia is added', () => {
        const danhMucQuocGiaCollection: IDanhMucQuocGia[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucQuocGiaToCollectionIfMissing(danhMucQuocGiaCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucQuocGiaCollection);
      });
    });

    describe('compareDanhMucQuocGia', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucQuocGia(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucQuocGia(entity1, entity2);
        const compareResult2 = service.compareDanhMucQuocGia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucQuocGia(entity1, entity2);
        const compareResult2 = service.compareDanhMucQuocGia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucQuocGia(entity1, entity2);
        const compareResult2 = service.compareDanhMucQuocGia(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
