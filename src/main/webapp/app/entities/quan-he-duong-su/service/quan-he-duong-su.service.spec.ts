import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quan-he-duong-su.test-samples';

import { QuanHeDuongSuService } from './quan-he-duong-su.service';

const requireRestSample: IQuanHeDuongSu = {
  ...sampleWithRequiredData,
};

describe('QuanHeDuongSu Service', () => {
  let service: QuanHeDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuanHeDuongSu | IQuanHeDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuanHeDuongSuService);
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

    it('should create a QuanHeDuongSu', () => {
      const quanHeDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quanHeDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuanHeDuongSu', () => {
      const quanHeDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quanHeDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuanHeDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuanHeDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuanHeDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuanHeDuongSuToCollectionIfMissing', () => {
      it('should add a QuanHeDuongSu to an empty array', () => {
        const quanHeDuongSu: IQuanHeDuongSu = sampleWithRequiredData;
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing([], quanHeDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanHeDuongSu);
      });

      it('should not add a QuanHeDuongSu to an array that contains it', () => {
        const quanHeDuongSu: IQuanHeDuongSu = sampleWithRequiredData;
        const quanHeDuongSuCollection: IQuanHeDuongSu[] = [
          {
            ...quanHeDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing(quanHeDuongSuCollection, quanHeDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuanHeDuongSu to an array that doesn't contain it", () => {
        const quanHeDuongSu: IQuanHeDuongSu = sampleWithRequiredData;
        const quanHeDuongSuCollection: IQuanHeDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing(quanHeDuongSuCollection, quanHeDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanHeDuongSu);
      });

      it('should add only unique QuanHeDuongSu to an array', () => {
        const quanHeDuongSuArray: IQuanHeDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quanHeDuongSuCollection: IQuanHeDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing(quanHeDuongSuCollection, ...quanHeDuongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quanHeDuongSu: IQuanHeDuongSu = sampleWithRequiredData;
        const quanHeDuongSu2: IQuanHeDuongSu = sampleWithPartialData;
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing([], quanHeDuongSu, quanHeDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanHeDuongSu);
        expect(expectedResult).toContain(quanHeDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const quanHeDuongSu: IQuanHeDuongSu = sampleWithRequiredData;
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing([], null, quanHeDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanHeDuongSu);
      });

      it('should return initial array if no QuanHeDuongSu is added', () => {
        const quanHeDuongSuCollection: IQuanHeDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addQuanHeDuongSuToCollectionIfMissing(quanHeDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(quanHeDuongSuCollection);
      });
    });

    describe('compareQuanHeDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuanHeDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuanHeDuongSu(entity1, entity2);
        const compareResult2 = service.compareQuanHeDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuanHeDuongSu(entity1, entity2);
        const compareResult2 = service.compareQuanHeDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuanHeDuongSu(entity1, entity2);
        const compareResult2 = service.compareQuanHeDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
