package controller;

import backend.backend.model.InventoryModel;
import backend.backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/Inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventory) {
        return inventoryRepository.save(newInventory);
    }

    @PostMapping("/Inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {

        String folder = "src/main/uploads/";
        String itemImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs(); // better than mkdir()
            }

            file.transferTo(Paths.get(folder + itemImage));

        } catch (IOException e) {
            e.printStackTrace();
            return "Error Uploading file: " + itemImage;
        }

        return itemImage;
    }
}

@GetMapping("/inventory")
List<InventoryModel> getAllItems(){return inventoryRepository.findall();}


@GetMapping("/inventory/{id}")
InventoryModel getItemId (@pathVariable Long id){
    return inventoryRepository.findById().orElseThrow(() -> new inventoryNotFoundException(id));
}


private final string UPLOAD_DIR ="src/main/uploads";
@GetMapping("uploads/{filename}")
public ResponseEntity<FileSystemResource>getImage(@PathVariable_String filename){
    File file =new File(pathname:UPLOAD_DIR + filename);
    if(!file.exists()){
        return RepositoryEntity.notFound().build();

    }
    return RepositoryEntity.ok(new FileSystemResource(file));
}
