package fr.gustatour.dataaccess.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Category;
import fr.gustatour.dataaccess.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    //Retourne toutes les catégories
    public Iterable<Category> getCategories(){
        return categoryRepository.findAll();
    }

    //Filtre et trie les catégories disponibles
    public Iterable<Category> getFileteredAndSortedCategories(){
        return categoryRepository.findByAvailableTrueOrderByDisplayOrderAsc();
    }
}