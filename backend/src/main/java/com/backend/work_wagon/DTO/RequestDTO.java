package com.backend.work_wagon.DTO;

import com.backend.work_wagon.Enum.UserRole;

public class RequestDTO {

    private Integer receiverId;
    private UserRole receiverRole;

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
// getters and setters
}