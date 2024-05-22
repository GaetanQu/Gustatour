package fr.gustatour.dataaccess.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import fr.gustatour.dataaccess.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
    
}
