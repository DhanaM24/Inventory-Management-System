package controller;

import backend.backend.model.InventoryModel;
import backend.backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/Inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventory){
        return inventoryRepository.save(newInventory);
    }

    @PostMapping("/Inventory/itemImg")
    public String itemImage(@RequestParam ("file")MultipartFile file {
        String folder ="src/main/uploads/";
        String itemImage = file.getOriginalFilename();


        try{
            File uploadDir =new File(folder);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }
file.transferTo(Paths.get(folder+itemImage));
            }catch (IOException e) {
            e.printStackTrace();
                return "Error Uploading file ; " + itemImage;
        }
        return  itemImage;
        }
}

