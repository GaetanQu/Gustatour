package fr.gustatour.dataaccess.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @Column(name = "type_id")
    private Integer type_id;

    @Column(name = "allergene_id")
    private Integer allergene_id;

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

    public Integer getType_id() {
        return this.type_id;
    }

    public void setType_id(Integer type_id) {
        this.type_id = type_id;
    }

    public Integer getAllergene_id() {
        return this.allergene_id;
    }

    public void setAllergene_id(Integer allergene_id) {
        this.allergene_id = allergene_id;
    }
}
