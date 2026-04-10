package com.backend.work_wagon.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;

@Entity
@Table(name="workers")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String worker_name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private BigInteger mobile;
    private String email;
    private String available;
    private String work_known;
    private int age;
    private String city;
    private BigDecimal salary;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String imageType;
    private String imageName;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] imageData;

    public String getWorker_name() {
        return worker_name;
    }

    public void setWorker_name(String worker_name) {
        this.worker_name = worker_name;
    }

    public BigInteger getMobile() {
        return mobile;
    }

    public void setMobile(BigInteger mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvailable() {
        return available;
    }

    public void setAvailable(String available) {
        this.available = available;
    }

    public String getWork_known() {
        return work_known;
    }

    public void setWork_known(String work_known) {
        this.work_known = work_known;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    @Override
    public String toString() {
        return "worker{" +
                "worker_name='" + worker_name + '\'' +
                ", mobile=" + mobile +
                ", email='" + email + '\'' +
                ", available=" + available +
                ", work_known='" + work_known + '\'' +
                ", age=" + age +
                ", city='" + city + '\'' +
                ", salary=" + salary +
                ", imageType='" + imageType + '\'' +
                ", imageName='" + imageName + '\'' +
                ", imageData=" + Arrays.toString(imageData) +
                '}';
    }
}
