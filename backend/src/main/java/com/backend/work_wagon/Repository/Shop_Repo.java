package com.backend.work_wagon.Repository;

import com.backend.work_wagon.Model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.work_wagon.Model.Shop;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface Shop_Repo extends JpaRepository<Shop,Integer> {


    Optional<Shop> findByEmail(String email);
    Optional<Shop> findByMobile(BigInteger mobile);
}
