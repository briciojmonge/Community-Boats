package main.java.com.tour.dto;

public class TourDTO {
    private Long id;
    private String name;
    private String location;
    private Double price;
    private String guideName;
    private String guideCommunity;

    public TourDTO(Long id, String name, String location, Double price, String guideName, String guideCommunity) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.price = price;
        this.guideName = guideName;
        this.guideCommunity = guideCommunity;
    }
    // getters y setters
}