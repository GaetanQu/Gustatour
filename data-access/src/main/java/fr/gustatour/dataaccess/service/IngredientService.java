package fr.gustatour.dataaccess.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Ingredient;
import fr.gustatour.dataaccess.model.Product;
import fr.gustatour.dataaccess.repository.IngredientRepository;
import fr.gustatour.dataaccess.repository.ProductRepository;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private ProductService productService;

    //Retourne tous les ingrédients
    public Iterable<Ingredient> getIngredients(){
        return ingredientRepository.findAll();
    }

    //Met à jour un ingrédient
    public void updateIngredient(int ingredientId, Ingredient updatedIngredient) {
        Optional<Ingredient> optionalIngredient = ingredientRepository.findById(ingredientId);

        if(optionalIngredient.isPresent()) {
            Ingredient originalIngredient = optionalIngredient.get();

            //Mise à jour des propriétés de l'ingrédient
            if(updatedIngredient.getName() != null) {
                originalIngredient.setName(updatedIngredient.getName());
            }

            originalIngredient.setAvailable(updatedIngredient.getAvailable());
            for(Product product : productService.getProducts()) {
                productService.setProductAvailabilityByIngredientAvailability(product);
            }

            if(updatedIngredient.getTypeOfIngredient() != null) {
                originalIngredient.setTypeOfIngredient(updatedIngredient.getTypeOfIngredient());
            }

            if(updatedIngredient.getAllergenes() != null) {
                originalIngredient.setAllergenes(updatedIngredient.getAllergenes());
            }

            ingredientRepository.save(originalIngredient);
        }
    }
}
