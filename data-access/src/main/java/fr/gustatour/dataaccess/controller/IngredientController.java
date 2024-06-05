package fr.gustatour.dataaccess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.model.Ingredient;
import fr.gustatour.dataaccess.service.IngredientService;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {
    
    @Autowired
    private IngredientService ingredientService;

    @RequestMapping("/all")
    public Iterable<Ingredient> getAllIngredients(){
        return ingredientService.getIngredients();
    }
}
