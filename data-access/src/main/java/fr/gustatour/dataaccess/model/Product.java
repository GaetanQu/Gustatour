package fr.gustatour.dataaccess.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table (name="product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@OneToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "available")
	private boolean available;
	
	@Column(name = "image_link")
	private String image_link;
	
	@OneToOne
	@JoinColumn(name = "menu_id")
	private Menu menu;
	
	@Column(name = "diet_id")
	private Integer diet_id;

	@Column(name = "price")
	private Float price;

	@ManyToMany(
		fetch = FetchType.LAZY,
		cascade = (
			CascadeType.PERSIST
		)
	)
	@JoinTable(
		name = "meal_ingredient",
		joinColumns = @JoinColumn(name = "meal_id"),
		inverseJoinColumns = @JoinColumn(name = "ingredient_id")
	)
	private List<Ingredient> ingredients = new ArrayList<>();
	

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
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

	public String getImage_link() {
		return this.image_link;
	}

	public void setImage_link(String image_link) {
		this.image_link = image_link;
	}

	public Menu getMenu() {
		return this.menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public Integer getDiet_id() {
		return this.diet_id;
	}

	public void setDiet_id(Integer diet_id) {
		this.diet_id = diet_id;
	}

	public Float getPrice() {
		return this.price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public List<Ingredient> getIngredients() {
		return this.ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

}
