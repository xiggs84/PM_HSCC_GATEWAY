import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITaisanSaiDgc } from '../taisan-sai-dgc.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../taisan-sai-dgc.test-samples';

import { TaisanSaiDgcService } from './taisan-sai-dgc.service';

const requireRestSample: ITaisanSaiDgc = {
  ...sampleWithRequiredData,
};

describe('TaisanSaiDgc Service', () => {
  let service: TaisanSaiDgcService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaisanSaiDgc | ITaisanSaiDgc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaisanSaiDgcService);
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

    it('should create a TaisanSaiDgc', () => {
      const taisanSaiDgc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taisanSaiDgc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaisanSaiDgc', () => {
      const taisanSaiDgc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taisanSaiDgc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaisanSaiDgc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaisanSaiDgc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaisanSaiDgc', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaisanSaiDgcToCollectionIfMissing', () => {
      it('should add a TaisanSaiDgc to an empty array', () => {
        const taisanSaiDgc: ITaisanSaiDgc = sampleWithRequiredData;
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing([], taisanSaiDgc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taisanSaiDgc);
      });

      it('should not add a TaisanSaiDgc to an array that contains it', () => {
        const taisanSaiDgc: ITaisanSaiDgc = sampleWithRequiredData;
        const taisanSaiDgcCollection: ITaisanSaiDgc[] = [
          {
            ...taisanSaiDgc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing(taisanSaiDgcCollection, taisanSaiDgc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaisanSaiDgc to an array that doesn't contain it", () => {
        const taisanSaiDgc: ITaisanSaiDgc = sampleWithRequiredData;
        const taisanSaiDgcCollection: ITaisanSaiDgc[] = [sampleWithPartialData];
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing(taisanSaiDgcCollection, taisanSaiDgc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taisanSaiDgc);
      });

      it('should add only unique TaisanSaiDgc to an array', () => {
        const taisanSaiDgcArray: ITaisanSaiDgc[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taisanSaiDgcCollection: ITaisanSaiDgc[] = [sampleWithRequiredData];
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing(taisanSaiDgcCollection, ...taisanSaiDgcArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taisanSaiDgc: ITaisanSaiDgc = sampleWithRequiredData;
        const taisanSaiDgc2: ITaisanSaiDgc = sampleWithPartialData;
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing([], taisanSaiDgc, taisanSaiDgc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taisanSaiDgc);
        expect(expectedResult).toContain(taisanSaiDgc2);
      });

      it('should accept null and undefined values', () => {
        const taisanSaiDgc: ITaisanSaiDgc = sampleWithRequiredData;
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing([], null, taisanSaiDgc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taisanSaiDgc);
      });

      it('should return initial array if no TaisanSaiDgc is added', () => {
        const taisanSaiDgcCollection: ITaisanSaiDgc[] = [sampleWithRequiredData];
        expectedResult = service.addTaisanSaiDgcToCollectionIfMissing(taisanSaiDgcCollection, undefined, null);
        expect(expectedResult).toEqual(taisanSaiDgcCollection);
      });
    });

    describe('compareTaisanSaiDgc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaisanSaiDgc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaisanSaiDgc(entity1, entity2);
        const compareResult2 = service.compareTaisanSaiDgc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaisanSaiDgc(entity1, entity2);
        const compareResult2 = service.compareTaisanSaiDgc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaisanSaiDgc(entity1, entity2);
        const compareResult2 = service.compareTaisanSaiDgc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
