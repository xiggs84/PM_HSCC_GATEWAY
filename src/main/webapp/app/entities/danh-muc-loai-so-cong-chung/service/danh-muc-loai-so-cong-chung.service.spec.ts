import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-so-cong-chung.test-samples';

import { DanhMucLoaiSoCongChungService } from './danh-muc-loai-so-cong-chung.service';

const requireRestSample: IDanhMucLoaiSoCongChung = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiSoCongChung Service', () => {
  let service: DanhMucLoaiSoCongChungService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiSoCongChung | IDanhMucLoaiSoCongChung[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiSoCongChungService);
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

    it('should create a DanhMucLoaiSoCongChung', () => {
      const danhMucLoaiSoCongChung = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiSoCongChung).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiSoCongChung', () => {
      const danhMucLoaiSoCongChung = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiSoCongChung).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiSoCongChung', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiSoCongChung', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiSoCongChung', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiSoCongChungToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiSoCongChung to an empty array', () => {
        const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing([], danhMucLoaiSoCongChung);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiSoCongChung);
      });

      it('should not add a DanhMucLoaiSoCongChung to an array that contains it', () => {
        const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = sampleWithRequiredData;
        const danhMucLoaiSoCongChungCollection: IDanhMucLoaiSoCongChung[] = [
          {
            ...danhMucLoaiSoCongChung,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing(danhMucLoaiSoCongChungCollection, danhMucLoaiSoCongChung);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiSoCongChung to an array that doesn't contain it", () => {
        const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = sampleWithRequiredData;
        const danhMucLoaiSoCongChungCollection: IDanhMucLoaiSoCongChung[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing(danhMucLoaiSoCongChungCollection, danhMucLoaiSoCongChung);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiSoCongChung);
      });

      it('should add only unique DanhMucLoaiSoCongChung to an array', () => {
        const danhMucLoaiSoCongChungArray: IDanhMucLoaiSoCongChung[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiSoCongChungCollection: IDanhMucLoaiSoCongChung[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing(
          danhMucLoaiSoCongChungCollection,
          ...danhMucLoaiSoCongChungArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = sampleWithRequiredData;
        const danhMucLoaiSoCongChung2: IDanhMucLoaiSoCongChung = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing([], danhMucLoaiSoCongChung, danhMucLoaiSoCongChung2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiSoCongChung);
        expect(expectedResult).toContain(danhMucLoaiSoCongChung2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing([], null, danhMucLoaiSoCongChung, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiSoCongChung);
      });

      it('should return initial array if no DanhMucLoaiSoCongChung is added', () => {
        const danhMucLoaiSoCongChungCollection: IDanhMucLoaiSoCongChung[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiSoCongChungToCollectionIfMissing(danhMucLoaiSoCongChungCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiSoCongChungCollection);
      });
    });

    describe('compareDanhMucLoaiSoCongChung', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiSoCongChung(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiSoCongChung(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiSoCongChung(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiSoCongChung(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiSoCongChung(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiSoCongChung(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiSoCongChung(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
