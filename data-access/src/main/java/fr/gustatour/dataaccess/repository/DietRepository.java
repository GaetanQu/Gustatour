package fr.gustatour.dataaccess.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fr.gustatour.dataaccess.model.Diet;

@Repository
public interface DietRepository extends CrudRepository<Diet, Integer> {
    
}
