package vn.vnpt.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link vn.vnpt.domain.DanhMucCanBo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DanhMucCanBoDTO implements Serializable {

    private Long id;

    private Long idCanBo;

    private String tenCanBo;

    private String diaChi;

    private LocalDate namSinh;

    private String email;

    private String soDienThoai;

    private String soCmnd;

    private String tenDangNhap;

    private String matKhau;

    private Long trangThai;

    private String clientId;

    private String clientSecret;

    private String usernameKyso;

    private String passwordKyso;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCanBo() {
        return idCanBo;
    }

    public void setIdCanBo(Long idCanBo) {
        this.idCanBo = idCanBo;
    }

    public String getTenCanBo() {
        return tenCanBo;
    }

    public void setTenCanBo(String tenCanBo) {
        this.tenCanBo = tenCanBo;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public LocalDate getNamSinh() {
        return namSinh;
    }

    public void setNamSinh(LocalDate namSinh) {
        this.namSinh = namSinh;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getSoCmnd() {
        return soCmnd;
    }

    public void setSoCmnd(String soCmnd) {
        this.soCmnd = soCmnd;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public Long getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Long trangThai) {
        this.trangThai = trangThai;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getUsernameKyso() {
        return usernameKyso;
    }

    public void setUsernameKyso(String usernameKyso) {
        this.usernameKyso = usernameKyso;
    }

    public String getPasswordKyso() {
        return passwordKyso;
    }

    public void setPasswordKyso(String passwordKyso) {
        this.passwordKyso = passwordKyso;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DanhMucCanBoDTO)) {
            return false;
        }

        DanhMucCanBoDTO danhMucCanBoDTO = (DanhMucCanBoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, danhMucCanBoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DanhMucCanBoDTO{" +
            "id=" + getId() +
            ", idCanBo=" + getIdCanBo() +
            ", tenCanBo='" + getTenCanBo() + "'" +
            ", diaChi='" + getDiaChi() + "'" +
            ", namSinh='" + getNamSinh() + "'" +
            ", email='" + getEmail() + "'" +
            ", soDienThoai='" + getSoDienThoai() + "'" +
            ", soCmnd='" + getSoCmnd() + "'" +
            ", tenDangNhap='" + getTenDangNhap() + "'" +
            ", matKhau='" + getMatKhau() + "'" +
            ", trangThai=" + getTrangThai() +
            ", clientId='" + getClientId() + "'" +
            ", clientSecret='" + getClientSecret() + "'" +
            ", usernameKyso='" + getUsernameKyso() + "'" +
            ", passwordKyso='" + getPasswordKyso() + "'" +
            "}";
    }
}
