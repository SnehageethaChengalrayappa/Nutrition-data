const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const foodItemSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      foodGroup: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      nutritionalInformation: {
        calories: {
          type: Number,
          required: true,
        },
        macronutrients: {
          proteins: {
            type: Number,
            required: true,
          },
          fats: {
            type: Number,
            required: true,
          },
          carbohydrates: {
            type: Number,
            required: true,
          },
        },
        micronutrients: {
          vitamins: {
            type: String,
            required: true,
          },
          minerals: {
            type: String,
            required: true,
          },
        },
        fiber: {
          type: Number,
          required: true,
        },
        sodium: {
          type: Number,
          required: true,
        },
        cholesterol: {
          type: Number,
          required: true,
        },
      },
      servingSize: {
        type: String,
        required: true,
      },
      allergens: {
        type: [String],
        required: true,
      },
      ingredients: {
        type: [String],
        required: true,
      },
      preparationMethods: {
        type: [String],
        required: true,
      },
      certifications: {
        type: [String],
        required: true,
      },
      countryOfOrigin: {
        type: String,
        required: true,
      },
      brandOrManufacturer: {
        type: String,
        required: true,
      },dietaryRestrictions: {
        type: [String],
        required: true,
      },
      healthBenefits: {
        type: [String],
        required: true,
      },
      bestPractices: {
        type: [String],
        required: true,
      },
    });
    
    module.exports = mongoose.model('FoodItem', foodItemSchema);

    const express = require('express');
    const router = express.Router();
    const FoodItem = require('../models/foodItem');
    
    // Create a new food item
    router.post('/', async (req, res) => {
      const foodItem = new FoodItem({
        name: req.body.name,
        foodGroup: req.body.foodGroup,
        description: req.body.description,
        nutritionalInformation: req.body.nutritionalInformation,
        servingSize: req.body.servingSize,
        allergens: req.body.allergens,
        ingredients: req.body.ingredients,
        preparationMethods: req.body.preparationMethods,
        certifications: req.body.certifications,
        countryOfOrigin: req.body.countryOfOrigin,
        brandOrManufacturer: req.body.brandOrManufacturer,
        dietaryRestrictions: req.body.dietaryRestrictions,
        healthBenefits: req.body.healthBenefits,
        bestPractices: req.body.bestPractices,
      });
    
      try {
        const newFoodItem = await foodItem.save();
        res.status(201).json(newFoodItem);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
    
    // Get all food items
    router.get('/', async (req, res) => {
      try {
        const foodItems = await FoodItem.find();
        res.json(foodItems);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    
    // Get a specific food item by ID
    router.get('/:id', getFoodItem, (req, res) => {
      res.json(res.foodItem);
    });
    
    // Update a food item
    router.patch('/:id', getFoodItem, async (req, res) => {
      if (req.body.name != null) {
        res.foodItem.name = req.body.name;
      }
    
      if (req.body.foodGroup != null) {
        res.foodItem.foodGroup = req.body.foodGroup;
      }
    
      if (req.body.description != null) {
        res.foodItem.description = req.body.description;
      }
    
      if (req.body.nutritionalInformation != null) {
        res.foodItem.nutritionalInformation = req.body.nutritionalInformation;
      }
    
      if (req.body.servingSize != null) {
        res.foodItem.servingSize = req.body.servingSize;
      }
    
      if (req.body.allergens != null) {
        res.foodItem.allergens = req.body.allergens;
      }
    
      if (req.body.ingredients != null) {
        res.foodItem.ingredients = req.body.ingredients;
      }
    
      if (req.body.preparationMethods != null) {
        res.foodItem.preparationMethods = req.body.preparationMethods;
      }
    
      if (req.body.certifications != null) {
        res.foodItem.certifications = req.body.certifications;
      }
    
      if (req.body.countryOfOrigin != null) {
        res.foodItem.countryOfOrigin = req.body.countryOfOrigin;
      }
    
      if (req.body.brandOrManufacturer != null) {
        res.foodItem.brandOrManufacturer = req.body.brandOrManufacturer;
      }
    
      if (req.body.dietaryRestrictions != null) {
       res.foodItem.dietaryRestrictions = req.body.dietaryRestrictions;
      }
    
      if (req.body.healthBenefits != null) {
        res.foodItem.healthBenefits = req.body.healthBenefits;
      }
    
      if (req.body.bestPractices != null) {
        res.foodItem.bestPractices = req.body.bestPractices;
      }
    
      try {
        const updatedFoodItem = await res.foodItem.save();
        res.json(updatedFoodItem);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
    
    // Delete a food item
    router.delete('/:id', getFoodItem, async (req, res) => {
      try {
        await res.foodItem.remove();
        res.json({ message: 'Deleted Food Item' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    
    async function getFoodItem(req, res, next) {
      let foodItem;
      try {
        foodItem = await FoodItem.findById(req.params.id);
        if (foodItem == null) {
          return res.status(404).json({ message: 'Cannot find food item' });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    
      res.foodItem = foodItem;
      next();
    }
    
    module.exports = router;

    const mongoose = require('mongoose');

const mongoDBURL = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<databaseName>?retryWrites=true&w=majority';

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));