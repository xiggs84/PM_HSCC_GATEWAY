import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuanHeMaster } from '../quan-he-master.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quan-he-master.test-samples';

import { QuanHeMasterService } from './quan-he-master.service';

const requireRestSample: IQuanHeMaster = {
  ...sampleWithRequiredData,
};

describe('QuanHeMaster Service', () => {
  let service: QuanHeMasterService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuanHeMaster | IQuanHeMaster[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuanHeMasterService);
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

    it('should create a QuanHeMaster', () => {
      const quanHeMaster = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quanHeMaster).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuanHeMaster', () => {
      const quanHeMaster = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quanHeMaster).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuanHeMaster', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuanHeMaster', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuanHeMaster', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuanHeMasterToCollectionIfMissing', () => {
      it('should add a QuanHeMaster to an empty array', () => {
        const quanHeMaster: IQuanHeMaster = sampleWithRequiredData;
        expectedResult = service.addQuanHeMasterToCollectionIfMissing([], quanHeMaster);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanHeMaster);
      });

      it('should not add a QuanHeMaster to an array that contains it', () => {
        const quanHeMaster: IQuanHeMaster = sampleWithRequiredData;
        const quanHeMasterCollection: IQuanHeMaster[] = [
          {
            ...quanHeMaster,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuanHeMasterToCollectionIfMissing(quanHeMasterCollection, quanHeMaster);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuanHeMaster to an array that doesn't contain it", () => {
        const quanHeMaster: IQuanHeMaster = sampleWithRequiredData;
        const quanHeMasterCollection: IQuanHeMaster[] = [sampleWithPartialData];
        expectedResult = service.addQuanHeMasterToCollectionIfMissing(quanHeMasterCollection, quanHeMaster);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanHeMaster);
      });

      it('should add only unique QuanHeMaster to an array', () => {
        const quanHeMasterArray: IQuanHeMaster[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quanHeMasterCollection: IQuanHeMaster[] = [sampleWithRequiredData];
        expectedResult = service.addQuanHeMasterToCollectionIfMissing(quanHeMasterCollection, ...quanHeMasterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quanHeMaster: IQuanHeMaster = sampleWithRequiredData;
        const quanHeMaster2: IQuanHeMaster = sampleWithPartialData;
        expectedResult = service.addQuanHeMasterToCollectionIfMissing([], quanHeMaster, quanHeMaster2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanHeMaster);
        expect(expectedResult).toContain(quanHeMaster2);
      });

      it('should accept null and undefined values', () => {
        const quanHeMaster: IQuanHeMaster = sampleWithRequiredData;
        expectedResult = service.addQuanHeMasterToCollectionIfMissing([], null, quanHeMaster, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanHeMaster);
      });

      it('should return initial array if no QuanHeMaster is added', () => {
        const quanHeMasterCollection: IQuanHeMaster[] = [sampleWithRequiredData];
        expectedResult = service.addQuanHeMasterToCollectionIfMissing(quanHeMasterCollection, undefined, null);
        expect(expectedResult).toEqual(quanHeMasterCollection);
      });
    });

    describe('compareQuanHeMaster', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuanHeMaster(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuanHeMaster(entity1, entity2);
        const compareResult2 = service.compareQuanHeMaster(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuanHeMaster(entity1, entity2);
        const compareResult2 = service.compareQuanHeMaster(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuanHeMaster(entity1, entity2);
        const compareResult2 = service.compareQuanHeMaster(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
