package fr.gustatour.dataaccess.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Diet;
import fr.gustatour.dataaccess.repository.DietRepository;

@Service
public class DietService {
    
    @Autowired
    private DietRepository dietRepository;

    public Iterable<Diet> getDiets(){
        return dietRepository.findAll();
    }
}
