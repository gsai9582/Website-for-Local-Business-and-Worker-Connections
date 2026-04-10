package com.backend.work_wagon.Service;

import com.backend.work_wagon.Model.Worker;
import com.backend.work_wagon.Repository.Shop_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.backend.work_wagon.Model.Shop;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class Shop_Service {

    @Autowired
    Shop_Repo repo;



    public List<Shop> getShops() {
        return  repo.findAll();
    }

    public Shop addShop(Shop shop, MultipartFile imageFile) throws IOException {

        if (repo.findByEmail(shop.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        if (repo.findByMobile(shop.getMobile()).isPresent()) {
            throw new RuntimeException("Mobile number already registered");
        }

        if (imageFile == null || imageFile.isEmpty()) {
            throw new RuntimeException("Image is required");
        }


        shop.setImageName(imageFile.getOriginalFilename());
        shop.setImageType(imageFile.getContentType());
        shop.setImageData(imageFile.getBytes());

        return repo.save(shop);
    }

    public Shop login(String email, String password) {
       /* Shop shop = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!shop.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }*/
        List<Shop> shops=repo.findAll();
        for(Shop shop:shops)
        {
            if(shop.getEmail().equals(email) && shop.getPassword().equals(password))
                return shop;
        }
        return null;
    }
    public Shop getById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found"));
    }
}
