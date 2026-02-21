from django.db import models
from django.urls import reverse
# Create your models here.

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

class Car(models.Model):
    # === Main Models ===
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveBigIntegerField(
        validators=[MinValueValidator(1900), MaxValueValidator(2026)]
    )
    badge_text = models.CharField(max_length=50, default="Model")
    tagline = models.CharField(max_length=255, blank=True, null=True)

    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    display_price = models.CharField(max_length=20, blank=True, null=True)
    hero_image = models.URLField(max_length=500, blank=True, null=True)

    # === Specs Models ===
    engine = models.CharField(max_length=100 , blank=True)
    transmission = models.CharField(max_length=100 , blank=True)
    horsepower = models.CharField(max_length=100 , blank=True)
    fuel_economy = models.CharField(max_length=100 , blank=True)
    top_speed = models.CharField(max_length=100 , blank=True)
    acceleration = models.CharField(max_length=100 , blank=True)
    drivetrain = models.CharField(max_length=100 , blank=True)


    # === About Models ===
    description = models.TextField(blank=True)

    # === Features Models ===
    comfort_features = models.JSONField(default=list, blank=True)
    safety_features = models.JSONField(default=list, blank=True)
    technology_features = models.JSONField(default=list, blank=True)
    performance_features = models.JSONField(default=list, blank=True)


    # === Gallery Models ===
    gallery_exterior = models.JSONField(default=list, blank=True)
    gallery_interior = models.JSONField(default=list, blank=True)


    # === Technical Specifications Models ===
    engine_type = models.CharField(max_length=100, blank=True)       
    displacement = models.CharField(max_length=50, blank=True)    
    max_power = models.CharField(max_length=100, blank=True)          
    max_torque = models.CharField(max_length=100, blank=True)       
    compression_ratio = models.CharField(max_length=50, blank=True)   
    fuel_system = models.CharField(max_length=100, blank=True)       
    transmission_type = models.CharField(max_length=100, blank=True)  
    drivetrain_type = models.CharField(max_length=100, blank=True)
    front_suspension = models.CharField(max_length=100, blank=True)   
    rear_suspension = models.CharField(max_length=100, blank=True)   
    steering = models.CharField(max_length=100, blank=True)    
    brakes_front = models.CharField(max_length=100, blank=True)   
    brakes_rear = models.CharField(max_length=100, blank=True)       
    wheels_front = models.CharField(max_length=100, blank=True)     
    wheels_rear = models.CharField(max_length=100, blank=True)        
    curb_weight = models.CharField(max_length=50, blank=True)      
    length = models.CharField(max_length=50, blank=True)            
    width = models.CharField(max_length=50, blank=True)               
    height = models.CharField(max_length=50, blank=True)             
    wheelbase = models.CharField(max_length=50, blank=True)         



    # === Similar Cars Models ===
    similar_cars = models.ManyToManyField('self', blank=True)

    

    # === Important Data Models ===
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    views_count = models.PositiveBigIntegerField(default=0)


    


    class Meta:
        ordering = ['-year', 'brand', 'model']
        indexes = [
            models.Index(fields=['brand','model']),
            models.Index(fields=['year']),
        ]

    def __str__(self):
        return f"{self.brand} {self.model} {self.year}"



















