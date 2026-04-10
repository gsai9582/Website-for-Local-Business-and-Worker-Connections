package com.backend.work_wagon.Service;

import com.backend.work_wagon.DTO.RequestDTO;
import com.backend.work_wagon.Enum.RequestStatus;
import com.backend.work_wagon.Enum.UserRole;
import com.backend.work_wagon.Model.Request;
import com.backend.work_wagon.Model.Shop;
import com.backend.work_wagon.Model.Worker;
import com.backend.work_wagon.Repository.RequestRepository;
import com.backend.work_wagon.Repository.Shop_Repo;
import com.backend.work_wagon.Repository.Worker_Repo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private Shop_Repo shopRepo;

    @Autowired
    private Worker_Repo workerRepo;


    public Request sendRequest(RequestDTO dto, HttpSession session) {

        Integer shopId = (Integer) session.getAttribute("shop");
        Integer workerId = (Integer) session.getAttribute("worker");

        if (shopId == null && workerId == null) {
            throw new RuntimeException("Not authenticated");
        }

        Request request = new Request();

        if (shopId != null) {
            boolean alreadyExists =
                    requestRepository.existsBySenderIdAndSenderRoleAndReceiverIdAndReceiverRoleAndStatus(
                            shopId,
                            UserRole.SHOP,
                            dto.getReceiverId(),
                            UserRole.WORKER,
                            RequestStatus.PENDING
                    );

            if (alreadyExists) {
                throw new RuntimeException("Request already sent");
            }
            Shop senderShop = shopRepo.findById(shopId)
                    .orElseThrow(() -> new RuntimeException("Sender shop not found"));

            Worker receiverWorker = workerRepo.findById(dto.getReceiverId())
                    .orElseThrow(() -> new RuntimeException("Receiver worker not found"));

            request.setSenderId(senderShop.getId());
            request.setSenderRole(UserRole.SHOP);
            request.setReceiverId(receiverWorker.getId());
            request.setReceiverRole(UserRole.WORKER);
        }

        // WORKER sending request to SHOP
        if (workerId != null) {
            boolean alreadyExists =
                    requestRepository.existsBySenderIdAndSenderRoleAndReceiverIdAndReceiverRoleAndStatus(
                            workerId,
                            UserRole.WORKER,
                            dto.getReceiverId(),
                            UserRole.SHOP,
                            RequestStatus.PENDING
                    );

            if (alreadyExists) {
                throw new RuntimeException("Request already sent");
            }
            Worker senderWorker = workerRepo.findById(workerId)
                    .orElseThrow(() -> new RuntimeException("Sender worker not found"));

            Shop receiverShop = shopRepo.findById(dto.getReceiverId())
                    .orElseThrow(() -> new RuntimeException("Receiver shop not found"));

            request.setSenderId(senderWorker.getId());
            request.setSenderRole(UserRole.WORKER);
            request.setReceiverId(receiverShop.getId());
            request.setReceiverRole(UserRole.SHOP);
        }

        request.setStatus(RequestStatus.PENDING);

        return requestRepository.save(request);
    }

    public List<Request> getPendingRequests(HttpSession session) {

        Integer shopId = (Integer) session.getAttribute("shop");
        Integer workerId = (Integer) session.getAttribute("worker");

        if (shopId != null) {
            return requestRepository.findByReceiverIdAndStatus(shopId, RequestStatus.PENDING);
        }

        if (workerId != null) {
            return requestRepository.findByReceiverIdAndStatus(workerId, RequestStatus.PENDING);
        }

        throw new RuntimeException("Not authenticated");
    }

    public List<Request> getAcceptedRequests(HttpSession session) {

        Integer shopId = (Integer) session.getAttribute("shop");
        Integer workerId = (Integer) session.getAttribute("worker");

        if (shopId != null) {
            return requestRepository.findByReceiverIdAndStatus(shopId, RequestStatus.ACCEPTED);
        }

        if (workerId != null) {
            return requestRepository.findByReceiverIdAndStatus(workerId, RequestStatus.ACCEPTED);
        }

        throw new RuntimeException("Not authenticated");
    }

    public Request acceptRequest(Integer id) {

        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.ACCEPTED);

        if (request.getReceiverRole() == UserRole.SHOP) {

            Shop shop = shopRepo.findById(request.getReceiverId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));

            Worker worker = workerRepo.findById(request.getSenderId())
                    .orElseThrow(() -> new RuntimeException("Worker not found"));

            shop.setAvailable(shop.getAvailable() - 1);
            worker.setAvailable("NO");

            shopRepo.save(shop);
            workerRepo.save(worker);

        }

        if (request.getReceiverRole() == UserRole.WORKER) {

            Worker worker = workerRepo.findById(request.getReceiverId())
                    .orElseThrow(() -> new RuntimeException("Worker not found"));

            Shop shop = shopRepo.findById(request.getSenderId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));

            shop.setAvailable(shop.getAvailable() - 1);
            worker.setAvailable("NO");

            shopRepo.save(shop);
            workerRepo.save(worker);
        }

        return requestRepository.save(request);
    }
    public Request rejectRequest(Integer id) {

        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.REJECTED);

        return requestRepository.save(request);
    }
}