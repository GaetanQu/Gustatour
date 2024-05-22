package fr.gustatour.dataaccess.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Ingredient;
import fr.gustatour.dataaccess.repository.IngredientRepository;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Iterable<Ingredient> getIngredients(){
        return ingredientRepository.findAll();
    }
}
