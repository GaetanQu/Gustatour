package fr.gustatour.dataaccess.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fr.gustatour.dataaccess.model.Ingredient;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Integer> {
    
}
