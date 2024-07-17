package vn.vnpt.repository.rowmapper;

import io.r2dbc.spi.Row;
import java.time.LocalDate;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;
import vn.vnpt.domain.DanhMucCanBo;

/**
 * Converter between {@link Row} to {@link DanhMucCanBo}, with proper type conversions.
 */
@Service
public class DanhMucCanBoRowMapper implements BiFunction<Row, String, DanhMucCanBo> {

    private final ColumnConverter converter;

    public DanhMucCanBoRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link DanhMucCanBo} stored in the database.
     */
    @Override
    public DanhMucCanBo apply(Row row, String prefix) {
        DanhMucCanBo entity = new DanhMucCanBo();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setIdCanBo(converter.fromRow(row, prefix + "_id_can_bo", Long.class));
        entity.setTenCanBo(converter.fromRow(row, prefix + "_ten_can_bo", String.class));
        entity.setDiaChi(converter.fromRow(row, prefix + "_dia_chi", String.class));
        entity.setNamSinh(converter.fromRow(row, prefix + "_nam_sinh", LocalDate.class));
        entity.setEmail(converter.fromRow(row, prefix + "_email", String.class));
        entity.setSoDienThoai(converter.fromRow(row, prefix + "_so_dien_thoai", String.class));
        entity.setSoCmnd(converter.fromRow(row, prefix + "_so_cmnd", String.class));
        entity.setTenDangNhap(converter.fromRow(row, prefix + "_ten_dang_nhap", String.class));
        entity.setMatKhau(converter.fromRow(row, prefix + "_mat_khau", String.class));
        entity.setTrangThai(converter.fromRow(row, prefix + "_trang_thai", Long.class));
        entity.setClientId(converter.fromRow(row, prefix + "_client_id", String.class));
        entity.setClientSecret(converter.fromRow(row, prefix + "_client_secret", String.class));
        entity.setUsernameKyso(converter.fromRow(row, prefix + "_username_kyso", String.class));
        entity.setPasswordKyso(converter.fromRow(row, prefix + "_password_kyso", String.class));
        return entity;
    }
}
