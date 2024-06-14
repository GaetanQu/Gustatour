package fr.gustatour.dataaccess.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.TypeOfIngredient;
import fr.gustatour.dataaccess.repository.TypeOfIngredientRepository;

@Service
public class TypeOfIngredientService {
    
    @Autowired
    private TypeOfIngredientRepository typeOfIngredientRepository;

    //Retourne tous les types d'ingrédients
    public Iterable<TypeOfIngredient> getTypesOfIngredient(){
        return typeOfIngredientRepository.findAll();
    }
}
