import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-loai-don-vi.test-samples';

import { DanhMucLoaiDonViService } from './danh-muc-loai-don-vi.service';

const requireRestSample: IDanhMucLoaiDonVi = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiDonVi Service', () => {
  let service: DanhMucLoaiDonViService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiDonVi | IDanhMucLoaiDonVi[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiDonViService);
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

    it('should create a DanhMucLoaiDonVi', () => {
      const danhMucLoaiDonVi = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiDonVi).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiDonVi', () => {
      const danhMucLoaiDonVi = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiDonVi).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiDonVi', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiDonVi', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiDonVi', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiDonViToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiDonVi to an empty array', () => {
        const danhMucLoaiDonVi: IDanhMucLoaiDonVi = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing([], danhMucLoaiDonVi);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiDonVi);
      });

      it('should not add a DanhMucLoaiDonVi to an array that contains it', () => {
        const danhMucLoaiDonVi: IDanhMucLoaiDonVi = sampleWithRequiredData;
        const danhMucLoaiDonViCollection: IDanhMucLoaiDonVi[] = [
          {
            ...danhMucLoaiDonVi,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing(danhMucLoaiDonViCollection, danhMucLoaiDonVi);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiDonVi to an array that doesn't contain it", () => {
        const danhMucLoaiDonVi: IDanhMucLoaiDonVi = sampleWithRequiredData;
        const danhMucLoaiDonViCollection: IDanhMucLoaiDonVi[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing(danhMucLoaiDonViCollection, danhMucLoaiDonVi);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiDonVi);
      });

      it('should add only unique DanhMucLoaiDonVi to an array', () => {
        const danhMucLoaiDonViArray: IDanhMucLoaiDonVi[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiDonViCollection: IDanhMucLoaiDonVi[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing(danhMucLoaiDonViCollection, ...danhMucLoaiDonViArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiDonVi: IDanhMucLoaiDonVi = sampleWithRequiredData;
        const danhMucLoaiDonVi2: IDanhMucLoaiDonVi = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing([], danhMucLoaiDonVi, danhMucLoaiDonVi2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiDonVi);
        expect(expectedResult).toContain(danhMucLoaiDonVi2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiDonVi: IDanhMucLoaiDonVi = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing([], null, danhMucLoaiDonVi, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiDonVi);
      });

      it('should return initial array if no DanhMucLoaiDonVi is added', () => {
        const danhMucLoaiDonViCollection: IDanhMucLoaiDonVi[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiDonViToCollectionIfMissing(danhMucLoaiDonViCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiDonViCollection);
      });
    });

    describe('compareDanhMucLoaiDonVi', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiDonVi(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiDonVi(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiDonVi(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiDonVi(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiDonVi(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiDonVi(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiDonVi(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
