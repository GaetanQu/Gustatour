package fr.gustatour.dataaccess.controller;

import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.service.ProductService;
import fr.gustatour.dataaccess.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/product")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public Iterable<Product> getAllProducts() {
        return productService.getProducts();
    }
}
