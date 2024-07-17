package vn.vnpt.domain.criteria;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link vn.vnpt.domain.DanhMucCanBo} entity. This class is used
 * in {@link vn.vnpt.web.rest.DanhMucCanBoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /danh-muc-can-bos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DanhMucCanBoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter idCanBo;

    private StringFilter tenCanBo;

    private StringFilter diaChi;

    private LocalDateFilter namSinh;

    private StringFilter email;

    private StringFilter soDienThoai;

    private StringFilter soCmnd;

    private StringFilter tenDangNhap;

    private StringFilter matKhau;

    private LongFilter trangThai;

    private StringFilter clientId;

    private StringFilter clientSecret;

    private StringFilter usernameKyso;

    private StringFilter passwordKyso;

    private Boolean distinct;

    public DanhMucCanBoCriteria() {}

    public DanhMucCanBoCriteria(DanhMucCanBoCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.idCanBo = other.optionalIdCanBo().map(LongFilter::copy).orElse(null);
        this.tenCanBo = other.optionalTenCanBo().map(StringFilter::copy).orElse(null);
        this.diaChi = other.optionalDiaChi().map(StringFilter::copy).orElse(null);
        this.namSinh = other.optionalNamSinh().map(LocalDateFilter::copy).orElse(null);
        this.email = other.optionalEmail().map(StringFilter::copy).orElse(null);
        this.soDienThoai = other.optionalSoDienThoai().map(StringFilter::copy).orElse(null);
        this.soCmnd = other.optionalSoCmnd().map(StringFilter::copy).orElse(null);
        this.tenDangNhap = other.optionalTenDangNhap().map(StringFilter::copy).orElse(null);
        this.matKhau = other.optionalMatKhau().map(StringFilter::copy).orElse(null);
        this.trangThai = other.optionalTrangThai().map(LongFilter::copy).orElse(null);
        this.clientId = other.optionalClientId().map(StringFilter::copy).orElse(null);
        this.clientSecret = other.optionalClientSecret().map(StringFilter::copy).orElse(null);
        this.usernameKyso = other.optionalUsernameKyso().map(StringFilter::copy).orElse(null);
        this.passwordKyso = other.optionalPasswordKyso().map(StringFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public DanhMucCanBoCriteria copy() {
        return new DanhMucCanBoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public Optional<LongFilter> optionalId() {
        return Optional.ofNullable(id);
    }

    public LongFilter id() {
        if (id == null) {
            setId(new LongFilter());
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LongFilter getIdCanBo() {
        return idCanBo;
    }

    public Optional<LongFilter> optionalIdCanBo() {
        return Optional.ofNullable(idCanBo);
    }

    public LongFilter idCanBo() {
        if (idCanBo == null) {
            setIdCanBo(new LongFilter());
        }
        return idCanBo;
    }

    public void setIdCanBo(LongFilter idCanBo) {
        this.idCanBo = idCanBo;
    }

    public StringFilter getTenCanBo() {
        return tenCanBo;
    }

    public Optional<StringFilter> optionalTenCanBo() {
        return Optional.ofNullable(tenCanBo);
    }

    public StringFilter tenCanBo() {
        if (tenCanBo == null) {
            setTenCanBo(new StringFilter());
        }
        return tenCanBo;
    }

    public void setTenCanBo(StringFilter tenCanBo) {
        this.tenCanBo = tenCanBo;
    }

    public StringFilter getDiaChi() {
        return diaChi;
    }

    public Optional<StringFilter> optionalDiaChi() {
        return Optional.ofNullable(diaChi);
    }

    public StringFilter diaChi() {
        if (diaChi == null) {
            setDiaChi(new StringFilter());
        }
        return diaChi;
    }

    public void setDiaChi(StringFilter diaChi) {
        this.diaChi = diaChi;
    }

    public LocalDateFilter getNamSinh() {
        return namSinh;
    }

    public Optional<LocalDateFilter> optionalNamSinh() {
        return Optional.ofNullable(namSinh);
    }

    public LocalDateFilter namSinh() {
        if (namSinh == null) {
            setNamSinh(new LocalDateFilter());
        }
        return namSinh;
    }

    public void setNamSinh(LocalDateFilter namSinh) {
        this.namSinh = namSinh;
    }

    public StringFilter getEmail() {
        return email;
    }

    public Optional<StringFilter> optionalEmail() {
        return Optional.ofNullable(email);
    }

    public StringFilter email() {
        if (email == null) {
            setEmail(new StringFilter());
        }
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public StringFilter getSoDienThoai() {
        return soDienThoai;
    }

    public Optional<StringFilter> optionalSoDienThoai() {
        return Optional.ofNullable(soDienThoai);
    }

    public StringFilter soDienThoai() {
        if (soDienThoai == null) {
            setSoDienThoai(new StringFilter());
        }
        return soDienThoai;
    }

    public void setSoDienThoai(StringFilter soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public StringFilter getSoCmnd() {
        return soCmnd;
    }

    public Optional<StringFilter> optionalSoCmnd() {
        return Optional.ofNullable(soCmnd);
    }

    public StringFilter soCmnd() {
        if (soCmnd == null) {
            setSoCmnd(new StringFilter());
        }
        return soCmnd;
    }

    public void setSoCmnd(StringFilter soCmnd) {
        this.soCmnd = soCmnd;
    }

    public StringFilter getTenDangNhap() {
        return tenDangNhap;
    }

    public Optional<StringFilter> optionalTenDangNhap() {
        return Optional.ofNullable(tenDangNhap);
    }

    public StringFilter tenDangNhap() {
        if (tenDangNhap == null) {
            setTenDangNhap(new StringFilter());
        }
        return tenDangNhap;
    }

    public void setTenDangNhap(StringFilter tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public StringFilter getMatKhau() {
        return matKhau;
    }

    public Optional<StringFilter> optionalMatKhau() {
        return Optional.ofNullable(matKhau);
    }

    public StringFilter matKhau() {
        if (matKhau == null) {
            setMatKhau(new StringFilter());
        }
        return matKhau;
    }

    public void setMatKhau(StringFilter matKhau) {
        this.matKhau = matKhau;
    }

    public LongFilter getTrangThai() {
        return trangThai;
    }

    public Optional<LongFilter> optionalTrangThai() {
        return Optional.ofNullable(trangThai);
    }

    public LongFilter trangThai() {
        if (trangThai == null) {
            setTrangThai(new LongFilter());
        }
        return trangThai;
    }

    public void setTrangThai(LongFilter trangThai) {
        this.trangThai = trangThai;
    }

    public StringFilter getClientId() {
        return clientId;
    }

    public Optional<StringFilter> optionalClientId() {
        return Optional.ofNullable(clientId);
    }

    public StringFilter clientId() {
        if (clientId == null) {
            setClientId(new StringFilter());
        }
        return clientId;
    }

    public void setClientId(StringFilter clientId) {
        this.clientId = clientId;
    }

    public StringFilter getClientSecret() {
        return clientSecret;
    }

    public Optional<StringFilter> optionalClientSecret() {
        return Optional.ofNullable(clientSecret);
    }

    public StringFilter clientSecret() {
        if (clientSecret == null) {
            setClientSecret(new StringFilter());
        }
        return clientSecret;
    }

    public void setClientSecret(StringFilter clientSecret) {
        this.clientSecret = clientSecret;
    }

    public StringFilter getUsernameKyso() {
        return usernameKyso;
    }

    public Optional<StringFilter> optionalUsernameKyso() {
        return Optional.ofNullable(usernameKyso);
    }

    public StringFilter usernameKyso() {
        if (usernameKyso == null) {
            setUsernameKyso(new StringFilter());
        }
        return usernameKyso;
    }

    public void setUsernameKyso(StringFilter usernameKyso) {
        this.usernameKyso = usernameKyso;
    }

    public StringFilter getPasswordKyso() {
        return passwordKyso;
    }

    public Optional<StringFilter> optionalPasswordKyso() {
        return Optional.ofNullable(passwordKyso);
    }

    public StringFilter passwordKyso() {
        if (passwordKyso == null) {
            setPasswordKyso(new StringFilter());
        }
        return passwordKyso;
    }

    public void setPasswordKyso(StringFilter passwordKyso) {
        this.passwordKyso = passwordKyso;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final DanhMucCanBoCriteria that = (DanhMucCanBoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(idCanBo, that.idCanBo) &&
            Objects.equals(tenCanBo, that.tenCanBo) &&
            Objects.equals(diaChi, that.diaChi) &&
            Objects.equals(namSinh, that.namSinh) &&
            Objects.equals(email, that.email) &&
            Objects.equals(soDienThoai, that.soDienThoai) &&
            Objects.equals(soCmnd, that.soCmnd) &&
            Objects.equals(tenDangNhap, that.tenDangNhap) &&
            Objects.equals(matKhau, that.matKhau) &&
            Objects.equals(trangThai, that.trangThai) &&
            Objects.equals(clientId, that.clientId) &&
            Objects.equals(clientSecret, that.clientSecret) &&
            Objects.equals(usernameKyso, that.usernameKyso) &&
            Objects.equals(passwordKyso, that.passwordKyso) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            idCanBo,
            tenCanBo,
            diaChi,
            namSinh,
            email,
            soDienThoai,
            soCmnd,
            tenDangNhap,
            matKhau,
            trangThai,
            clientId,
            clientSecret,
            usernameKyso,
            passwordKyso,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DanhMucCanBoCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalIdCanBo().map(f -> "idCanBo=" + f + ", ").orElse("") +
            optionalTenCanBo().map(f -> "tenCanBo=" + f + ", ").orElse("") +
            optionalDiaChi().map(f -> "diaChi=" + f + ", ").orElse("") +
            optionalNamSinh().map(f -> "namSinh=" + f + ", ").orElse("") +
            optionalEmail().map(f -> "email=" + f + ", ").orElse("") +
            optionalSoDienThoai().map(f -> "soDienThoai=" + f + ", ").orElse("") +
            optionalSoCmnd().map(f -> "soCmnd=" + f + ", ").orElse("") +
            optionalTenDangNhap().map(f -> "tenDangNhap=" + f + ", ").orElse("") +
            optionalMatKhau().map(f -> "matKhau=" + f + ", ").orElse("") +
            optionalTrangThai().map(f -> "trangThai=" + f + ", ").orElse("") +
            optionalClientId().map(f -> "clientId=" + f + ", ").orElse("") +
            optionalClientSecret().map(f -> "clientSecret=" + f + ", ").orElse("") +
            optionalUsernameKyso().map(f -> "usernameKyso=" + f + ", ").orElse("") +
            optionalPasswordKyso().map(f -> "passwordKyso=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
