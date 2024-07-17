import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../taisan-sai-qsdd-dgc.test-samples';

import { TaisanSaiQsddDgcService } from './taisan-sai-qsdd-dgc.service';

const requireRestSample: ITaisanSaiQsddDgc = {
  ...sampleWithRequiredData,
};

describe('TaisanSaiQsddDgc Service', () => {
  let service: TaisanSaiQsddDgcService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaisanSaiQsddDgc | ITaisanSaiQsddDgc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaisanSaiQsddDgcService);
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

    it('should create a TaisanSaiQsddDgc', () => {
      const taisanSaiQsddDgc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taisanSaiQsddDgc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaisanSaiQsddDgc', () => {
      const taisanSaiQsddDgc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taisanSaiQsddDgc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaisanSaiQsddDgc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaisanSaiQsddDgc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaisanSaiQsddDgc', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaisanSaiQsddDgcToCollectionIfMissing', () => {
      it('should add a TaisanSaiQsddDgc to an empty array', () => {
        const taisanSaiQsddDgc: ITaisanSaiQsddDgc = sampleWithRequiredData;
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing([], taisanSaiQsddDgc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taisanSaiQsddDgc);
      });

      it('should not add a TaisanSaiQsddDgc to an array that contains it', () => {
        const taisanSaiQsddDgc: ITaisanSaiQsddDgc = sampleWithRequiredData;
        const taisanSaiQsddDgcCollection: ITaisanSaiQsddDgc[] = [
          {
            ...taisanSaiQsddDgc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing(taisanSaiQsddDgcCollection, taisanSaiQsddDgc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaisanSaiQsddDgc to an array that doesn't contain it", () => {
        const taisanSaiQsddDgc: ITaisanSaiQsddDgc = sampleWithRequiredData;
        const taisanSaiQsddDgcCollection: ITaisanSaiQsddDgc[] = [sampleWithPartialData];
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing(taisanSaiQsddDgcCollection, taisanSaiQsddDgc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taisanSaiQsddDgc);
      });

      it('should add only unique TaisanSaiQsddDgc to an array', () => {
        const taisanSaiQsddDgcArray: ITaisanSaiQsddDgc[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taisanSaiQsddDgcCollection: ITaisanSaiQsddDgc[] = [sampleWithRequiredData];
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing(taisanSaiQsddDgcCollection, ...taisanSaiQsddDgcArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taisanSaiQsddDgc: ITaisanSaiQsddDgc = sampleWithRequiredData;
        const taisanSaiQsddDgc2: ITaisanSaiQsddDgc = sampleWithPartialData;
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing([], taisanSaiQsddDgc, taisanSaiQsddDgc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taisanSaiQsddDgc);
        expect(expectedResult).toContain(taisanSaiQsddDgc2);
      });

      it('should accept null and undefined values', () => {
        const taisanSaiQsddDgc: ITaisanSaiQsddDgc = sampleWithRequiredData;
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing([], null, taisanSaiQsddDgc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taisanSaiQsddDgc);
      });

      it('should return initial array if no TaisanSaiQsddDgc is added', () => {
        const taisanSaiQsddDgcCollection: ITaisanSaiQsddDgc[] = [sampleWithRequiredData];
        expectedResult = service.addTaisanSaiQsddDgcToCollectionIfMissing(taisanSaiQsddDgcCollection, undefined, null);
        expect(expectedResult).toEqual(taisanSaiQsddDgcCollection);
      });
    });

    describe('compareTaisanSaiQsddDgc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaisanSaiQsddDgc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaisanSaiQsddDgc(entity1, entity2);
        const compareResult2 = service.compareTaisanSaiQsddDgc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaisanSaiQsddDgc(entity1, entity2);
        const compareResult2 = service.compareTaisanSaiQsddDgc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaisanSaiQsddDgc(entity1, entity2);
        const compareResult2 = service.compareTaisanSaiQsddDgc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
