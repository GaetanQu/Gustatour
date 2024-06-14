package fr.gustatour.dataaccess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.gustatour.dataaccess.model.Allergene;
import fr.gustatour.dataaccess.service.AllergeneService;

@RestController
@RequestMapping("/allergene")
public class AllergeneController {
    
    @Autowired
    private AllergeneService allergeneService;

    //Retourne tous les allergènes
    @GetMapping("/all")
    public Iterable<Allergene> getAllAllergenes(){
        return allergeneService.getAllergenes();
    }
}
