import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-tinh-trang-hon-nhan.test-samples';

import { DanhMucTinhTrangHonNhanService } from './danh-muc-tinh-trang-hon-nhan.service';

const requireRestSample: IDanhMucTinhTrangHonNhan = {
  ...sampleWithRequiredData,
};

describe('DanhMucTinhTrangHonNhan Service', () => {
  let service: DanhMucTinhTrangHonNhanService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucTinhTrangHonNhan | IDanhMucTinhTrangHonNhan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucTinhTrangHonNhanService);
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

    it('should create a DanhMucTinhTrangHonNhan', () => {
      const danhMucTinhTrangHonNhan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucTinhTrangHonNhan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucTinhTrangHonNhan', () => {
      const danhMucTinhTrangHonNhan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucTinhTrangHonNhan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucTinhTrangHonNhan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucTinhTrangHonNhan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucTinhTrangHonNhan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucTinhTrangHonNhanToCollectionIfMissing', () => {
      it('should add a DanhMucTinhTrangHonNhan to an empty array', () => {
        const danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan = sampleWithRequiredData;
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing([], danhMucTinhTrangHonNhan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTinhTrangHonNhan);
      });

      it('should not add a DanhMucTinhTrangHonNhan to an array that contains it', () => {
        const danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan = sampleWithRequiredData;
        const danhMucTinhTrangHonNhanCollection: IDanhMucTinhTrangHonNhan[] = [
          {
            ...danhMucTinhTrangHonNhan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing(
          danhMucTinhTrangHonNhanCollection,
          danhMucTinhTrangHonNhan,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucTinhTrangHonNhan to an array that doesn't contain it", () => {
        const danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan = sampleWithRequiredData;
        const danhMucTinhTrangHonNhanCollection: IDanhMucTinhTrangHonNhan[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing(
          danhMucTinhTrangHonNhanCollection,
          danhMucTinhTrangHonNhan,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTinhTrangHonNhan);
      });

      it('should add only unique DanhMucTinhTrangHonNhan to an array', () => {
        const danhMucTinhTrangHonNhanArray: IDanhMucTinhTrangHonNhan[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const danhMucTinhTrangHonNhanCollection: IDanhMucTinhTrangHonNhan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing(
          danhMucTinhTrangHonNhanCollection,
          ...danhMucTinhTrangHonNhanArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan = sampleWithRequiredData;
        const danhMucTinhTrangHonNhan2: IDanhMucTinhTrangHonNhan = sampleWithPartialData;
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing([], danhMucTinhTrangHonNhan, danhMucTinhTrangHonNhan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTinhTrangHonNhan);
        expect(expectedResult).toContain(danhMucTinhTrangHonNhan2);
      });

      it('should accept null and undefined values', () => {
        const danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan = sampleWithRequiredData;
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing([], null, danhMucTinhTrangHonNhan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTinhTrangHonNhan);
      });

      it('should return initial array if no DanhMucTinhTrangHonNhan is added', () => {
        const danhMucTinhTrangHonNhanCollection: IDanhMucTinhTrangHonNhan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTinhTrangHonNhanToCollectionIfMissing(danhMucTinhTrangHonNhanCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucTinhTrangHonNhanCollection);
      });
    });

    describe('compareDanhMucTinhTrangHonNhan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucTinhTrangHonNhan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucTinhTrangHonNhan(entity1, entity2);
        const compareResult2 = service.compareDanhMucTinhTrangHonNhan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucTinhTrangHonNhan(entity1, entity2);
        const compareResult2 = service.compareDanhMucTinhTrangHonNhan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucTinhTrangHonNhan(entity1, entity2);
        const compareResult2 = service.compareDanhMucTinhTrangHonNhan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
