package com.booking.dto;

public class TourDTO {
    private Long id;
    private String name;
    private String location;
    private Double price;
    private Long guideId;

    public TourDTO() {}

    public TourDTO(Long id, String name, String location, Double price, Long guideId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.price = price;
        this.guideId = guideId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Long getGuideId() { return guideId; }
    public void setGuideId(Long guideId) { this.guideId = guideId; }
}
