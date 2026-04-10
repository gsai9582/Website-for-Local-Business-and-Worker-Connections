package com.backend.work_wagon.Controller;

import com.backend.work_wagon.DTO.RequestDTO;
import com.backend.work_wagon.Model.Request;
import com.backend.work_wagon.Service.RequestService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private RequestService service;

    @PostMapping("/send")
    public ResponseEntity<?> sendRequest(@RequestBody RequestDTO dto,
                                         HttpSession session) {
        try {
            Request request = service.sendRequest(dto, session);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPending(HttpSession session) {

        return ResponseEntity.ok(service.getPendingRequests(session));
    }

    @GetMapping("/accepted")
    public ResponseEntity<?> getAccepted(HttpSession session) {

        return ResponseEntity.ok(service.getAcceptedRequests(session));
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> accept(@PathVariable Integer id) {

        return ResponseEntity.ok(service.acceptRequest(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Integer id) {

        return ResponseEntity.ok(service.rejectRequest(id));
    }
}