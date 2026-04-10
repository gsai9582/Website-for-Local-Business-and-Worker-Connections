package com.backend.work_wagon.Controller;


import jakarta.servlet.http.HttpSession;
import com.backend.work_wagon.Model.Worker;
import com.backend.work_wagon.Service.Worker_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class WorkerController {

    @Autowired
    Worker_Service service;

    @GetMapping("/workers")
    public List<Worker> getWorkers()
    {
        return service.getWorkers();
    }

    @PostMapping("/worker")
    public ResponseEntity<?> addWorker(@RequestPart Worker worker, @RequestPart MultipartFile imageFile)
    {
        try
        {
            Worker w=service.addWorker(worker,imageFile);
            return  new ResponseEntity<>(w, HttpStatus.CREATED);
        }
        catch(Exception e)
        {
            return  new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/worker/login")
    public ResponseEntity<?> login(@RequestBody Worker loginRequest, HttpSession session) {
        try {
            Worker worker = service.login(loginRequest.getEmail(), loginRequest.getPassword());
            session.setAttribute("worker", worker.getId());
            return ResponseEntity.ok(worker);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/worker/profile")
    public ResponseEntity<?> getWorkerProfile(HttpSession session) {

        Integer workerId = (Integer) session.getAttribute("worker");

        if (workerId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Not logged in");
        }

        Worker worker = service.getById(workerId);
        return ResponseEntity.ok(worker);
    }

    @PostMapping("/worker/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }
}
