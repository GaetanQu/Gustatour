package fr.gustatour.dataaccess.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Product;
import fr.gustatour.dataaccess.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Iterable<Product> getProducts() {
        return productRepository.findAll();
    }

    public void updateProduct(int productId, Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product originalProduct = optionalProduct.get();

            // Mettre à jour les propriétés du produit
            if (updatedProduct.getName() != null) {
                originalProduct.setName(updatedProduct.getName());
            }
            if (updatedProduct.getCategory() != null) {
                originalProduct.setCategory(updatedProduct.getCategory());
            }
            if (updatedProduct.getMenu() != null) {
                originalProduct.setMenu(updatedProduct.getMenu());
            }
            if (updatedProduct.getImage_name() != null) {
                originalProduct.setImage_name(updatedProduct.getImage_name());
            }
            if (updatedProduct.getDiet_id() != null) {
                originalProduct.setDiet_id(updatedProduct.getDiet_id());
            }
            if (updatedProduct.getPrice() != null) {
                originalProduct.setPrice(updatedProduct.getPrice());
            }
            
            originalProduct.setAvailable(updatedProduct.getAvailable());
            
            if (updatedProduct.getIngredients() != null) {
                originalProduct.setIngredients(updatedProduct.getIngredients());
            }

            productRepository.save(originalProduct);
        } else {
            throw new EntityNotFoundException("Product not found with id " + productId);
        }
    }
}
