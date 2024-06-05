package fr.gustatour.dataaccess.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fr.gustatour.dataaccess.model.TypeOfIngredient;

@Repository
public interface TypeOfIngredientRepository extends CrudRepository<TypeOfIngredient, Integer> {
    
}
