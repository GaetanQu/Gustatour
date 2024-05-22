package fr.gustatour.dataaccess.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fr.gustatour.dataaccess.model.Menu;

@Repository
public interface MenuRepository extends CrudRepository<Menu, Integer> {
    
}
