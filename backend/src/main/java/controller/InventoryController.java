package controller;

import backend.backend.model.InventoryModel;
import backend.backend.repository.InventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import exception.InventoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private final String UPLOAD_DIR = "src/main/uploads/";

    // ✅ CREATE ITEM
    @PostMapping
    public InventoryModel createItem(@RequestBody InventoryModel newInventory) {
        return inventoryRepository.save(newInventory);
    }

    // ✅ UPLOAD IMAGE ONLY
    @PostMapping("/itemImg")
    public String uploadImage(@RequestParam("file") MultipartFile file) {

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String fileName = file.getOriginalFilename();
            file.transferTo(new File(UPLOAD_DIR + fileName));

            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("Error uploading file", e);
        }
    }

    // ✅ GET ALL ITEMS
    @GetMapping
    public List<InventoryModel> getAllItems() {
        return inventoryRepository.findAll();
    }

    // ✅ GET ONE ITEM
    @GetMapping("/{id}")
    public InventoryModel getItemById(@PathVariable Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    // ✅ VIEW IMAGE
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {

        File file = new File(UPLOAD_DIR + filename);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new FileSystemResource(file));
    }

    // ✅ UPDATE ITEM (JSON + Optional File)
    @PutMapping("/{id}")
    public InventoryModel updateItem(
            @RequestPart("itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id
    ) {

        InventoryModel newInventory;

        try {
            newInventory = objectMapper.readValue(itemDetails, InventoryModel.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing itemDetails", e);
        }

        return inventoryRepository.findById(id)
                .map(existingInventory -> {

                    existingInventory.setItemId(newInventory.getItemId());
                    existingInventory.setItemName(newInventory.getItemName());
                    existingInventory.setItemCategory(newInventory.getItemCategory());
                    existingInventory.setItemQty(newInventory.getItemQty());
                    existingInventory.setItemDetails(newInventory.getItemDetails());

                    // Update image if provided
                    if (file != null && !file.isEmpty()) {
                        try {
                            File uploadDir = new File(UPLOAD_DIR);
                            if (!uploadDir.exists()) {
                                uploadDir.mkdirs();
                            }

                            String fileName = file.getOriginalFilename();
                            file.transferTo(new File(UPLOAD_DIR + fileName));
                            existingInventory.setItemImage(fileName);

                        } catch (Exception e) {
                            throw new RuntimeException("Error saving file", e);
                        }
                    }

                    return inventoryRepository.save(existingInventory);

                })
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    // ✅ DELETE ITEM
    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {

        InventoryModel item = inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));

        inventoryRepository.delete(item);
        return "Item deleted successfully. ID: " + id;
    }
}
