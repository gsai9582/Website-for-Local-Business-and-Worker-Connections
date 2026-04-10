package com.backend.work_wagon.Service;

import com.backend.work_wagon.Model.Worker;
import com.backend.work_wagon.Repository.Worker_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class Worker_Service {

    @Autowired
    Worker_Repo repo;

    public List<Worker> getWorkers() {
        return repo.findAll();
    }

    public Worker addWorker(Worker worker, MultipartFile imageFile) throws IOException {
        worker.setImageName(imageFile.getOriginalFilename());
        worker.setImageType(imageFile.getContentType());
        worker.setImageData(imageFile.getBytes());
        return  repo.save(worker);
    }

    public Worker login(String email, String password) {
        Worker worker = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!worker.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return worker;
    }

    public Worker getById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
    }
}
