import React, { useState } from "react";
import "./RecipeAssistant.css";
import logo from "../assets/logo.png";
import axios from "axios";
import SubstituteAccordion from "./SubstituteAccordion";
import RecipeCard from "./RecipeCard";

const RecipeAssistant = () => {
  const [ingredient, setIngredient] = useState("");
  const [dietaryAccommodation, setDietaryAccommodations] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [recipeContext, setRecipeContext] = useState("");
  const [validationErrors, setErrors] = useState({
    ingredient: "",
    recipeContext: "",
  });
  const [substitutions, setSubstitutions] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  const handleAllergyKeyDown = (e) => {
    if (e.key === "Enter" && allergyInput.trim() !== "") {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const removeAllergy = (allergy) => {
    setAllergies(allergies.filter((a) => a !== allergy));
  };

  const validateFields = () => {
    let validationErrors = {};
    let isValid = true;

    if (ingredient.trim() === "") {
      validationErrors.ingredient = "Ingredient field cannot be empty";
      isValid = false;
    }

    if (recipeContext.trim() === "") {
      validationErrors.recipeContext = "Recipe field cannot be empty";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleDietaryAccommodationChange = (v) => {
    setDietaryAccommodations((prev) =>
      prev.includes(v) ? prev.filter((d) => d !== v) : [...prev, v]
    );
  };
  const substituteButtonClick = async () => {
    console.log("Substitute Button Clicked");

    if (!validateFields()) {
      console.log("Validation failed");
      return;
    }

    const dietaryString = dietaryAccommodation.join(",");
    const allergiesString = allergies.join(",");

    const requestData = {
      ingredient,
      dietaryAccommodation: dietaryString,
      allergens: allergiesString,
      recipeContext,
    };
    try {
      const response = await axios.post("/api/substitute", requestData);
      setSubstitutions(response.data.substitutions || []);

      console.log(response.data);
      console.log("Validation passed — API call completed");
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };
  const handleGenerateRecipeFromSubstitute = async (selectedSubstitute) => {
    console.log("Generating recipe using substitute:", selectedSubstitute);

    const dietaryString = dietaryAccommodation.join(",");
    const allergiesString = allergies.join(",");

    const requestData = {
      ingredient: selectedSubstitute,
      dietaryAccommodation: dietaryString,
      allergens: allergiesString,
      recipeContext,
    };

    try {
      const response = await axios.post("/api/getRecipe", requestData);

      console.log("Generated Recipe:", response.data);
      setGeneratedRecipe(response.data);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };
  return (
    <div className="form-container">
      <div className="logo-div">
        <img src={logo} alt="logo" className="header-image" />
        <label className="app-title">Recipe Ingredient Substitutor</label>
      </div>

      <div className="form-row">
        <label>Ingredient to substitute:</label>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => {
            setIngredient(e.target.value);
            if (validationErrors.ingredient)
              setErrors((prev) => ({ ...prev, ingredient: "" }));
          }}
          placeholder="Enter ingredient to substitute"
        />
        {validationErrors.ingredient && (
          <p className="error-text">{validationErrors.ingredient}</p>
        )}
      </div>

      <div className="form-row">
        <label>Allergies:</label>
        <div className="chip-input">
          <div className="chip-container">
            {allergies.map((a, index) => (
              <div className="chip" key={index}>
                {a}
                <span className="close-btn" onClick={() => removeAllergy(a)}>
                  ×
                </span>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            onKeyDown={handleAllergyKeyDown}
            placeholder="Type an Allergy and Press Enter"
          />
        </div>
      </div>

      <div className="form-row">
        <label>Dietary Accommodations:</label>
        <div className="checkbox-group">
          {["Low Calorie", "Gluten free", "High protein", "High Fibre"].map(
            (option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={dietaryAccommodation.includes(option)}
                  onChange={(e) =>
                    handleDietaryAccommodationChange(e.target.value)
                  }
                />
                {option}
              </label>
            )
          )}
        </div>
      </div>

      <div className="form-row">
        <label>Recipe:</label>
        <input
          type="text"
          value={recipeContext}
          onChange={(e) => {
            setRecipeContext(e.target.value);
            if (validationErrors.recipeContext)
              setErrors((prev) => ({ ...prev, recipeContext: "" }));
          }}
        />
        {validationErrors.recipeContext && (
          <p className="error-text">{validationErrors.recipeContext}</p>
        )}
      </div>

      <div className="button-div">
        <button onClick={substituteButtonClick}>Substitute Ingredient</button>
      </div>
      <SubstituteAccordion
        substitutions={substitutions}
        onGenerateRecipe={handleGenerateRecipeFromSubstitute}
      />
      <RecipeCard recipe={generatedRecipe} />
    </div>
  );
};

export default RecipeAssistant;
