import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../cau-hinh-hoa-don-dien-tu.test-samples';

import { CauHinhHoaDonDienTuService, RestCauHinhHoaDonDienTu } from './cau-hinh-hoa-don-dien-tu.service';

const requireRestSample: RestCauHinhHoaDonDienTu = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('CauHinhHoaDonDienTu Service', () => {
  let service: CauHinhHoaDonDienTuService;
  let httpMock: HttpTestingController;
  let expectedResult: ICauHinhHoaDonDienTu | ICauHinhHoaDonDienTu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CauHinhHoaDonDienTuService);
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

    it('should create a CauHinhHoaDonDienTu', () => {
      const cauHinhHoaDonDienTu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cauHinhHoaDonDienTu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CauHinhHoaDonDienTu', () => {
      const cauHinhHoaDonDienTu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cauHinhHoaDonDienTu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CauHinhHoaDonDienTu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CauHinhHoaDonDienTu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CauHinhHoaDonDienTu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCauHinhHoaDonDienTuToCollectionIfMissing', () => {
      it('should add a CauHinhHoaDonDienTu to an empty array', () => {
        const cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu = sampleWithRequiredData;
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing([], cauHinhHoaDonDienTu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhHoaDonDienTu);
      });

      it('should not add a CauHinhHoaDonDienTu to an array that contains it', () => {
        const cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu = sampleWithRequiredData;
        const cauHinhHoaDonDienTuCollection: ICauHinhHoaDonDienTu[] = [
          {
            ...cauHinhHoaDonDienTu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing(cauHinhHoaDonDienTuCollection, cauHinhHoaDonDienTu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CauHinhHoaDonDienTu to an array that doesn't contain it", () => {
        const cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu = sampleWithRequiredData;
        const cauHinhHoaDonDienTuCollection: ICauHinhHoaDonDienTu[] = [sampleWithPartialData];
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing(cauHinhHoaDonDienTuCollection, cauHinhHoaDonDienTu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhHoaDonDienTu);
      });

      it('should add only unique CauHinhHoaDonDienTu to an array', () => {
        const cauHinhHoaDonDienTuArray: ICauHinhHoaDonDienTu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cauHinhHoaDonDienTuCollection: ICauHinhHoaDonDienTu[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing(cauHinhHoaDonDienTuCollection, ...cauHinhHoaDonDienTuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu = sampleWithRequiredData;
        const cauHinhHoaDonDienTu2: ICauHinhHoaDonDienTu = sampleWithPartialData;
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing([], cauHinhHoaDonDienTu, cauHinhHoaDonDienTu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhHoaDonDienTu);
        expect(expectedResult).toContain(cauHinhHoaDonDienTu2);
      });

      it('should accept null and undefined values', () => {
        const cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu = sampleWithRequiredData;
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing([], null, cauHinhHoaDonDienTu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhHoaDonDienTu);
      });

      it('should return initial array if no CauHinhHoaDonDienTu is added', () => {
        const cauHinhHoaDonDienTuCollection: ICauHinhHoaDonDienTu[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhHoaDonDienTuToCollectionIfMissing(cauHinhHoaDonDienTuCollection, undefined, null);
        expect(expectedResult).toEqual(cauHinhHoaDonDienTuCollection);
      });
    });

    describe('compareCauHinhHoaDonDienTu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCauHinhHoaDonDienTu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCauHinhHoaDonDienTu(entity1, entity2);
        const compareResult2 = service.compareCauHinhHoaDonDienTu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCauHinhHoaDonDienTu(entity1, entity2);
        const compareResult2 = service.compareCauHinhHoaDonDienTu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCauHinhHoaDonDienTu(entity1, entity2);
        const compareResult2 = service.compareCauHinhHoaDonDienTu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
