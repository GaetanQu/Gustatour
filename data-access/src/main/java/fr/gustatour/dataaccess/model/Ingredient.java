package fr.gustatour.dataaccess.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ingredient")
public class Ingredient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "available")
    private boolean available;

    @OneToOne
    @JoinColumn(name = "type_id")
    private TypeOfIngredient typeOfIngredient;

    @ManyToMany
    @JoinTable(
        name = "ingredient_allergene",
        joinColumns = @JoinColumn(name = "ingredient_id"),
        inverseJoinColumns = @JoinColumn(name = "allergene_id")
    )
    private List<Allergene> allergenes = new ArrayList<>();


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAvailable() {
        return this.available;
    }

    public boolean getAvailable() {
        return this.available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public TypeOfIngredient getTypeOfIngredient() {
        return this.typeOfIngredient;
    }

    public void setTypeOfIngredient(TypeOfIngredient typeOfIngredient) {
        this.typeOfIngredient = typeOfIngredient;
    }

    public List<Allergene> getAllergenes() {
        return this.allergenes;
    }

    public void setAllergenes(List<Allergene> allergenes) {
        this.allergenes = allergenes;
    }
    
}
