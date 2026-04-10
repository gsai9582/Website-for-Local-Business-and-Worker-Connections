package com.backend.work_wagon.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "shops",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "mobile")
        })
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    @NotBlank(message = "Shop keeper name is required")
    private String shop_keeper_name;

    @NotBlank(message = "Job name is required")
    private String job_name;

    @NotBlank(message = "Shop name is required")
    private String shop_name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Mobile number is required")
    private BigInteger mobile;

    @Min(value = 0, message = "Available must be 0 or greater")
    private int available;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is required")
    private String password;

    private String imageName;
    private String imageType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] imageData;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getShop_keeper_name() {
        return shop_keeper_name;
    }

    public void setShop_keeper_name(String shop_keeper_name) {
        this.shop_keeper_name = shop_keeper_name;
    }

    public String getJob_name() {
        return job_name;
    }

    public void setJob_name(String job_name) {
        this.job_name = job_name;
    }

    public String getShop_name() {
        return shop_name;
    }

    public void setShop_name(String shop_name) {
        this.shop_name = shop_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigInteger getMobile() {
        return mobile;
    }

    public void setMobile(BigInteger mobile) {
        this.mobile = mobile;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    @Override
    public String toString() {
        return "shop{" +
                "shop_keeper_name='" + shop_keeper_name + '\'' +
                ", job_name='" + job_name + '\'' +
                ", shop_name='" + shop_name + '\'' +
                ", email='" + email + '\'' +
                ", mobile=" + mobile +
                ", available=" + available +'\'' +
                ", imageName='" + imageName + '\'' +
                ", imageType='" + imageType + '\'' +
                ", imageData=" + Arrays.toString(imageData) +
                '}';
    }
}
