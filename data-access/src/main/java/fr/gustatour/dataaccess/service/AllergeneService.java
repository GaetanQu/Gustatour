package fr.gustatour.dataaccess.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.gustatour.dataaccess.model.Allergene;
import fr.gustatour.dataaccess.repository.AllergeneRepository;

@Service
public class AllergeneService {

    @Autowired
    private AllergeneRepository allergeneRepository;

    public Iterable<Allergene> getAllergenes(){
        return allergeneRepository.findAll();
    }
    
}
