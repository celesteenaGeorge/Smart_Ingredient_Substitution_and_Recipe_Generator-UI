
import React, { useState } from "react";
import "./SubstituteAccordion.css";

const SubstituteAccordion = ({ substitutions, onGenerateRecipe }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!substitutions || substitutions.length === 0) {
    return null;
  }

  return (
    <div className="accordion-container">
      <h3>Suggested Substitutes:</h3>

      {substitutions.map((item, index) => (
        <div
          key={index}
          className={`accordion-card ${
            expandedIndex === index ? "expanded" : ""
          }`}
          onClick={() =>
            setExpandedIndex(expandedIndex === index ? null : index)
          }
        >
          <div className="accordion-header">
            <h4>{item.substitute}</h4>
            <span>{expandedIndex === index ? "−" : "+"}</span>
          </div>

          {expandedIndex === index && (
            <div className="accordion-content">
              <p>{item.explanation}</p>

              
              <button
                className="generate-btn"
                onClick={(e) => {
                  e.stopPropagation(); 
                  onGenerateRecipe(item.substitute);
                }}
              >
                Generate Recipe
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubstituteAccordion;
