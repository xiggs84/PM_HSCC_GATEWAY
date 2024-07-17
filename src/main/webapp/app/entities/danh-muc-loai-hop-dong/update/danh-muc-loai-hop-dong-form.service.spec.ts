import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-hop-dong.test-samples';

import { DanhMucLoaiHopDongFormService } from './danh-muc-loai-hop-dong-form.service';

describe('DanhMucLoaiHopDong Form Service', () => {
  let service: DanhMucLoaiHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dienGiai: expect.any(Object),
            idVaiTro1: expect.any(Object),
            idVaiTro2: expect.any(Object),
            fileHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            dieuKhoan: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcLoiChung: expect.any(Object),
            idNhom: expect.any(Object),
            fileLoiChung: expect.any(Object),
            chuyenTaiSan: expect.any(Object),
            loaiSuaDoi: expect.any(Object),
            loaiHuyBo: expect.any(Object),
            trangThaiDuyet: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            srcCv: expect.any(Object),
            srcTb: expect.any(Object),
            srcTtpc: expect.any(Object),
            dgTen: expect.any(Object),
            nhomTen: expect.any(Object),
            idVaiTro3: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dienGiai: expect.any(Object),
            idVaiTro1: expect.any(Object),
            idVaiTro2: expect.any(Object),
            fileHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            dieuKhoan: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcLoiChung: expect.any(Object),
            idNhom: expect.any(Object),
            fileLoiChung: expect.any(Object),
            chuyenTaiSan: expect.any(Object),
            loaiSuaDoi: expect.any(Object),
            loaiHuyBo: expect.any(Object),
            trangThaiDuyet: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            srcCv: expect.any(Object),
            srcTb: expect.any(Object),
            srcTtpc: expect.any(Object),
            dgTen: expect.any(Object),
            nhomTen: expect.any(Object),
            idVaiTro3: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiHopDong', () => {
      it('should return NewDanhMucLoaiHopDong for default DanhMucLoaiHopDong initial value', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup(sampleWithNewData);

        const danhMucLoaiHopDong = service.getDanhMucLoaiHopDong(formGroup) as any;

        expect(danhMucLoaiHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiHopDong for empty DanhMucLoaiHopDong initial value', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup();

        const danhMucLoaiHopDong = service.getDanhMucLoaiHopDong(formGroup) as any;

        expect(danhMucLoaiHopDong).toMatchObject({});
      });

      it('should return IDanhMucLoaiHopDong', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup(sampleWithRequiredData);

        const danhMucLoaiHopDong = service.getDanhMucLoaiHopDong(formGroup) as any;

        expect(danhMucLoaiHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiHopDong should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiHopDong should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
