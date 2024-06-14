package fr.gustatour.dataaccess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.model.Category;
import fr.gustatour.dataaccess.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    //Retourne toutes les catégories
    @GetMapping("/all")
    public Iterable<Category> getAllCategories(){
        return categoryService.getCategories();
    }
}
