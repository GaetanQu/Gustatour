package fr.gustatour.dataaccess.controller;

import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.service.ProductService;
import fr.gustatour.dataaccess.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/product")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public Iterable<Product> getAllProducts() {
        return productService.getProducts();
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Void> updateProduct(@PathVariable int productId, @RequestBody Product updatedProduct) {
        productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/delete/{productId}")
    public ResponseEntity<Product> deleteProduct(@PathVariable int productId, @RequestBody Product deletedProduct) {
        productService.deleteProduct(productId, deletedProduct);
        return ResponseEntity.ok(deletedProduct);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product newProduct) {
        Product savedProduct = productService.saveProduct(newProduct);
        return ResponseEntity.ok(savedProduct);
    }
    
}
