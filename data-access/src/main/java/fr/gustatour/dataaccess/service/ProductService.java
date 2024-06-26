package fr.gustatour.dataaccess.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Ingredient;
import fr.gustatour.dataaccess.model.Product;
import fr.gustatour.dataaccess.repository.IngredientRepository;
import fr.gustatour.dataaccess.repository.MenuRepository;
import fr.gustatour.dataaccess.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired 
    private MenuRepository menuRepository;

    @Autowired
    private IngredientRepository ingredientRepository;


    //Retourne tous les produits
    public Iterable<Product> getProducts() {
        return productRepository.findAll();
    }

    //Crée un produit
    @Transactional
    public Product saveProduct(Product addedProduct) {
        // Vérification de l'existence du produit en base de données
        if (addedProduct.getMenu() != null && addedProduct.getMenu().getId() != 0) {
            // On set le menu en fonction
            addedProduct.setMenu(menuRepository.findById(addedProduct.getMenu().getId()).orElse(null));
        }

        // Vérification de l'existence des ingrédients en base de données
        List<Ingredient> ingredients = new ArrayList<>();
        for (Ingredient ingredient : addedProduct.getIngredients()) {
            if (ingredient.getId() != 0) {
                ingredient = ingredientRepository.findById(ingredient.getId()).orElse(null);
                if (ingredient != null) {
                    ingredients.add(ingredient);
                }
            }
        }
        // On set l'ingrédient en fonction
        addedProduct.setIngredients(ingredients);

        return productRepository.save(addedProduct);
    }

    //Met à jout un produit
    public void updateProduct(int productId, Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product originalProduct = optionalProduct.get();

            if (updatedProduct.getName() != null) {
                originalProduct.setName(updatedProduct.getName());
            }
            if (updatedProduct.getCategory() != null) {
                originalProduct.setCategory(updatedProduct.getCategory());
            }
            if (updatedProduct.getMenu() != null) {
                originalProduct.setMenu(updatedProduct.getMenu());
            }
            if (updatedProduct.getImage_link() != null) {
                originalProduct.setImage_link(updatedProduct.getImage_link());
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

                setProductAvailabilityByIngredientAvailability(originalProduct);
            }

            productRepository.save(originalProduct);
        } else {
            throw new EntityNotFoundException("Product not found with id " + productId);
        }
    }

    //Teste si un produit est disponible en fonction de la disponibilité des ingrédients
    public void setProductAvailabilityByIngredientAvailability (Product product) {
        for(Ingredient ingredient : product.getIngredients()) {
            if(!ingredient.isAvailable()) {
                product.setAvailable(false);
                break;
            }

            product.setAvailable(true);
        }
    }


    //Supprime un produit
    public void deleteProduct(int productId, Product deletedProduct){
        this.productRepository.deleteById(productId);
    }
}
