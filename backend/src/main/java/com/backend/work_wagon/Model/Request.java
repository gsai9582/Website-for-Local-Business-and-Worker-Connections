package com.backend.work_wagon.Model;

import com.backend.work_wagon.Enum.RequestStatus;
import com.backend.work_wagon.Enum.UserRole;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer senderId;

    @Enumerated(EnumType.STRING)
    private UserRole senderRole;

    private Integer receiverId;

    @Enumerated(EnumType.STRING)
    private UserRole receiverRole;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private LocalDateTime createdAt;

    public Request() {
        this.createdAt = LocalDateTime.now();
        this.status = RequestStatus.PENDING;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public UserRole getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(UserRole senderRole) {
        this.senderRole = senderRole;
    }

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public UserRole getReceiverRole() {
        return receiverRole;
    }

    public void setReceiverRole(UserRole receiverRole) {
        this.receiverRole = receiverRole;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
// Getters and Setters
}