package fr.gustatour.dataaccess.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fr.gustatour.dataaccess.model.Allergene;

@Repository
public interface AllergeneRepository extends CrudRepository<Allergene, Integer> {
    
}
