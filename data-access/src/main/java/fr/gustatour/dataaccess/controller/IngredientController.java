package fr.gustatour.dataaccess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.model.Ingredient;
import fr.gustatour.dataaccess.service.IngredientService;


@RestController
@RequestMapping("/ingredient")
public class IngredientController {
    
    @Autowired
    private IngredientService ingredientService;

    //Retourne tous les ingrédients
    @GetMapping("/all")
    public Iterable<Ingredient> getAllIngredients(){
        return ingredientService.getIngredients();
    }

    //Met à jour un ingrédient
    @PutMapping("/update/{ingredientId}")
    public ResponseEntity<Void> updateIngredient(@PathVariable int ingredientId, @RequestBody Ingredient updatedIngredient) {
        ingredientService.updateIngredient(ingredientId, updatedIngredient);
        return ResponseEntity.noContent().build();
    }
    
}
