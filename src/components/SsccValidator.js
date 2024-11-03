import React, { useState } from "react";
import axios from "axios";
import "./SsccValidator.css";

// Hauptkomponente für die SSCC-Validierung
function SsccValidator() {
  // State-Variablen für die SSCC-Nummer, das Validierungsergebnis und Fehlermeldungen
  const [ssccNumber, setSsccNumber] = useState(""); // Eingabe für die SSCC-Nummer
  const [validationResult, setValidationResult] = useState(null); // Ergebnis der Validierung (gültig/ungültig)
  const [errorMessage, setErrorMessage] = useState(""); // Fehlermeldung bei Problemen

  // Funktion, die eine Validierungsanfrage an das Backend sendet
  const validateSSCC = async () => {
    try {
      // Anfrage an das Backend zur Validierung der SSCC-Nummer
      const response = await axios.post("http://localhost:8080/api/validate-sscc", {
        sscc: ssccNumber, // SSCC-Nummer, die validiert werden soll
      });

      // Ergebnis der Validierung setzen und Fehlermeldung zurücksetzen
      setValidationResult(response.data.isValid);
      setErrorMessage("");
    } catch (error) {
      // Fehler behandeln: Validierungsergebnis auf null und Fehlermeldung setzen
      setValidationResult(null);
      setErrorMessage("Es gab ein Problem bei der Validierung. Bitte versuche es erneut.");
    }
  };

  // Event-Handler für das Absenden des Formulars
  const handleSubmit = (e) => {
    e.preventDefault(); // Standardverhalten des Formulars verhindern
    validateSSCC(); // Validierung ausführen
  };

  // Rendering der Benutzeroberfläche
  return (
    <div className="container">
      <h1>SSCC-Nummer Validierung</h1>
      
      {/* Eingabeformular für die SSCC-Nummer */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ssccNumber} // Eingabewert für die SSCC-Nummer
          onChange={(e) => setSsccNumber(e.target.value)} // Aktualisierung des State bei Änderung
          placeholder="SSCC/NVE-Nummer eingeben" // Platzhaltertext für das Eingabefeld
        />
        
        {/* Button zum Absenden des Formulars */}
        <button type="submit">Validieren</button>
      </form>
      
      {/* Anzeige des Validierungsergebnisses */}
      {validationResult !== null && (
        <div className={`result ${validationResult ? "success" : "error"}`}>
          {/* Text, der das Validierungsergebnis anzeigt */}
          {validationResult ? "Die SSCC-Nummer ist gültig!" : "Die SSCC-Nummer ist ungültig."}
        </div>
      )}

      {/* Anzeige einer Fehlermeldung, falls ein Problem aufgetreten ist */}
      {errorMessage && <div className="result error">{errorMessage}</div>}
    </div>
  );
}

// Export der SsccValidator-Komponente
export default SsccValidator;
