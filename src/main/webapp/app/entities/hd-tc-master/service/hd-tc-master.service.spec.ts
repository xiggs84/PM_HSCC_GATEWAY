import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IHdTcMaster } from '../hd-tc-master.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../hd-tc-master.test-samples';

import { HdTcMasterService, RestHdTcMaster } from './hd-tc-master.service';

const requireRestSample: RestHdTcMaster = {
  ...sampleWithRequiredData,
  ngayLapHd: sampleWithRequiredData.ngayLapHd?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayHen: sampleWithRequiredData.ngayHen?.format(DATE_FORMAT),
  ngayKyHd: sampleWithRequiredData.ngayKyHd?.format(DATE_FORMAT),
  ngayRutTrich: sampleWithRequiredData.ngayRutTrich?.format(DATE_FORMAT),
};

describe('HdTcMaster Service', () => {
  let service: HdTcMasterService;
  let httpMock: HttpTestingController;
  let expectedResult: IHdTcMaster | IHdTcMaster[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(HdTcMasterService);
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

    it('should create a HdTcMaster', () => {
      const hdTcMaster = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(hdTcMaster).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HdTcMaster', () => {
      const hdTcMaster = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(hdTcMaster).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HdTcMaster', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HdTcMaster', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HdTcMaster', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHdTcMasterToCollectionIfMissing', () => {
      it('should add a HdTcMaster to an empty array', () => {
        const hdTcMaster: IHdTcMaster = sampleWithRequiredData;
        expectedResult = service.addHdTcMasterToCollectionIfMissing([], hdTcMaster);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdTcMaster);
      });

      it('should not add a HdTcMaster to an array that contains it', () => {
        const hdTcMaster: IHdTcMaster = sampleWithRequiredData;
        const hdTcMasterCollection: IHdTcMaster[] = [
          {
            ...hdTcMaster,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHdTcMasterToCollectionIfMissing(hdTcMasterCollection, hdTcMaster);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HdTcMaster to an array that doesn't contain it", () => {
        const hdTcMaster: IHdTcMaster = sampleWithRequiredData;
        const hdTcMasterCollection: IHdTcMaster[] = [sampleWithPartialData];
        expectedResult = service.addHdTcMasterToCollectionIfMissing(hdTcMasterCollection, hdTcMaster);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdTcMaster);
      });

      it('should add only unique HdTcMaster to an array', () => {
        const hdTcMasterArray: IHdTcMaster[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const hdTcMasterCollection: IHdTcMaster[] = [sampleWithRequiredData];
        expectedResult = service.addHdTcMasterToCollectionIfMissing(hdTcMasterCollection, ...hdTcMasterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hdTcMaster: IHdTcMaster = sampleWithRequiredData;
        const hdTcMaster2: IHdTcMaster = sampleWithPartialData;
        expectedResult = service.addHdTcMasterToCollectionIfMissing([], hdTcMaster, hdTcMaster2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdTcMaster);
        expect(expectedResult).toContain(hdTcMaster2);
      });

      it('should accept null and undefined values', () => {
        const hdTcMaster: IHdTcMaster = sampleWithRequiredData;
        expectedResult = service.addHdTcMasterToCollectionIfMissing([], null, hdTcMaster, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdTcMaster);
      });

      it('should return initial array if no HdTcMaster is added', () => {
        const hdTcMasterCollection: IHdTcMaster[] = [sampleWithRequiredData];
        expectedResult = service.addHdTcMasterToCollectionIfMissing(hdTcMasterCollection, undefined, null);
        expect(expectedResult).toEqual(hdTcMasterCollection);
      });
    });

    describe('compareHdTcMaster', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHdTcMaster(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHdTcMaster(entity1, entity2);
        const compareResult2 = service.compareHdTcMaster(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHdTcMaster(entity1, entity2);
        const compareResult2 = service.compareHdTcMaster(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHdTcMaster(entity1, entity2);
        const compareResult2 = service.compareHdTcMaster(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
