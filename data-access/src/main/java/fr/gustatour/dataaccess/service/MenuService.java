package fr.gustatour.dataaccess.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Menu;
import fr.gustatour.dataaccess.repository.MenuRepository;

@Service
public class MenuService {
    
    @Autowired
    private MenuRepository menuRepository;

    //Retourne tous les menus
    public Iterable<Menu> getMenus(){
        return menuRepository.findAll();
    }
}
