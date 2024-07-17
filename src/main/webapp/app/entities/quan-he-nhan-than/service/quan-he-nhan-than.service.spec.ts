import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuanHeNhanThan } from '../quan-he-nhan-than.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quan-he-nhan-than.test-samples';

import { QuanHeNhanThanService } from './quan-he-nhan-than.service';

const requireRestSample: IQuanHeNhanThan = {
  ...sampleWithRequiredData,
};

describe('QuanHeNhanThan Service', () => {
  let service: QuanHeNhanThanService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuanHeNhanThan | IQuanHeNhanThan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuanHeNhanThanService);
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

    it('should create a QuanHeNhanThan', () => {
      const quanHeNhanThan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quanHeNhanThan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuanHeNhanThan', () => {
      const quanHeNhanThan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quanHeNhanThan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuanHeNhanThan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuanHeNhanThan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuanHeNhanThan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuanHeNhanThanToCollectionIfMissing', () => {
      it('should add a QuanHeNhanThan to an empty array', () => {
        const quanHeNhanThan: IQuanHeNhanThan = sampleWithRequiredData;
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing([], quanHeNhanThan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanHeNhanThan);
      });

      it('should not add a QuanHeNhanThan to an array that contains it', () => {
        const quanHeNhanThan: IQuanHeNhanThan = sampleWithRequiredData;
        const quanHeNhanThanCollection: IQuanHeNhanThan[] = [
          {
            ...quanHeNhanThan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing(quanHeNhanThanCollection, quanHeNhanThan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuanHeNhanThan to an array that doesn't contain it", () => {
        const quanHeNhanThan: IQuanHeNhanThan = sampleWithRequiredData;
        const quanHeNhanThanCollection: IQuanHeNhanThan[] = [sampleWithPartialData];
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing(quanHeNhanThanCollection, quanHeNhanThan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanHeNhanThan);
      });

      it('should add only unique QuanHeNhanThan to an array', () => {
        const quanHeNhanThanArray: IQuanHeNhanThan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quanHeNhanThanCollection: IQuanHeNhanThan[] = [sampleWithRequiredData];
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing(quanHeNhanThanCollection, ...quanHeNhanThanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quanHeNhanThan: IQuanHeNhanThan = sampleWithRequiredData;
        const quanHeNhanThan2: IQuanHeNhanThan = sampleWithPartialData;
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing([], quanHeNhanThan, quanHeNhanThan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanHeNhanThan);
        expect(expectedResult).toContain(quanHeNhanThan2);
      });

      it('should accept null and undefined values', () => {
        const quanHeNhanThan: IQuanHeNhanThan = sampleWithRequiredData;
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing([], null, quanHeNhanThan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanHeNhanThan);
      });

      it('should return initial array if no QuanHeNhanThan is added', () => {
        const quanHeNhanThanCollection: IQuanHeNhanThan[] = [sampleWithRequiredData];
        expectedResult = service.addQuanHeNhanThanToCollectionIfMissing(quanHeNhanThanCollection, undefined, null);
        expect(expectedResult).toEqual(quanHeNhanThanCollection);
      });
    });

    describe('compareQuanHeNhanThan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuanHeNhanThan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuanHeNhanThan(entity1, entity2);
        const compareResult2 = service.compareQuanHeNhanThan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuanHeNhanThan(entity1, entity2);
        const compareResult2 = service.compareQuanHeNhanThan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuanHeNhanThan(entity1, entity2);
        const compareResult2 = service.compareQuanHeNhanThan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
