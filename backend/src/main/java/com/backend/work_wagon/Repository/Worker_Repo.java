package com.backend.work_wagon.Repository;


import com.backend.work_wagon.Model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Worker_Repo extends JpaRepository<Worker,Integer> {
    Optional<Worker> findByEmail(String email);
}
