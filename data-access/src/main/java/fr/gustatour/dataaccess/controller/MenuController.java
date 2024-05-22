package fr.gustatour.dataaccess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.model.Menu;
import fr.gustatour.dataaccess.service.MenuService;

@RestController
@RequestMapping("/menu")
public class MenuController {
    
    @Autowired
    private MenuService menuService;

    @RequestMapping("/all")
    public Iterable<Menu> getAllMenus(){
        return menuService.getMenus();
    }
}
