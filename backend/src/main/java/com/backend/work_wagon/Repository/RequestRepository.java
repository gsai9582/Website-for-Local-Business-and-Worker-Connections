package com.backend.work_wagon.Repository;

import com.backend.work_wagon.Enum.RequestStatus;
import com.backend.work_wagon.Enum.UserRole;
import com.backend.work_wagon.Model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    List<Request> findByReceiverId(Integer receiverId);

    List<Request> findBySenderId(Integer senderId);

    List<Request> findByReceiverIdAndStatus(Integer receiverId, Enum status);

    List<Request> findBySenderIdAndStatus(Integer senderId, Enum status);

    boolean existsBySenderIdAndSenderRoleAndReceiverIdAndReceiverRoleAndStatus(
            Integer senderId,
            UserRole senderRole,
            Integer receiverId,
            UserRole receiverRole,
            RequestStatus status
    );
}