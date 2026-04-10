package com.backend.work_wagon.Controller;

import jakarta.servlet.http.HttpSession;
import com.backend.work_wagon.Model.Shop;
import com.backend.work_wagon.Service.Shop_Service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
public class ShopController {

    @Autowired
    private Shop_Service service;


    @GetMapping("/shops")
    public List<Shop> getShops()
    {
        return service.getShops();
    }

    @PostMapping("/shop")
    public ResponseEntity<?> addShop(
            @Valid @RequestPart Shop shop,
            @RequestPart MultipartFile imageFile) {

        try {
            Shop s = service.addShop(shop, imageFile);
            return new ResponseEntity<>(s, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/shop/login")
    public ResponseEntity<?> login(@RequestBody Shop loginRequest, HttpSession session) {
        try {
            Shop shop = service.login(loginRequest.getEmail(), loginRequest.getPassword());
            session.setAttribute("shop", shop.getId());
            return ResponseEntity.ok(shop);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/shop/profile")
    public ResponseEntity<?> getShopProfile(HttpSession session) {

        Integer shopId = (Integer) session.getAttribute("shop");

        if (shopId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Not logged in");
        }

        Shop shop = service.getById(shopId);
        return ResponseEntity.ok(shop);
    }

    @PostMapping("/shop/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }



}
