import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";  // Import du package
import { oneDark } from "@codemirror/theme-one-dark";  // Import du thème One Dark

interface JsonInputProps {
  onDataSubmit: (data: any) => void;
}

export function JsonInput({ onDataSubmit }: JsonInputProps) {
  const defaultJson = `{
    "project_name": "{PROJET_NAME}",
    "start_date": "{YYY-MM-DD}",
    "end_date": "{YYY-MM-DD}",
    "team": [
      {
        "assignee": "{PROJET_MEMBER_1}",
        "tasks": [
          {
            "task": "{PROJET_MEMBER_1_TASK_1}",
            "start_date": "{YYY-MM-DD}",
            "end_date": "{YYY-MM-DD}"
          }
        ]
      },
      {
        "assignee": "{PROJET_MEMBER_2}",
        "tasks": [
          {
            "task": "{PROJET_MEMBER_2_TASK_1}",
            "start_date": "{YYY-MM-DD}",
            "end_date": "{YYY-MM-DD}"
          }
        ]
      }
    ]
  }`;

  const [jsonInput, setJsonInput] = useState<string>(defaultJson);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      onDataSubmit(parsedData);
      setError(null);
    } catch (e) {
      setError("Erreur de parsing JSON. Veuillez vérifier votre entrée.");
    }
  };

  return (
    <div className="mb-4">
      <div className="editor-container">
        <CodeMirror
          value={jsonInput}
          height="80vh"
          extensions={[json(), ...basicSetup()]}  // Appliquez le setup de base avec les extensions
          theme={oneDark}  // Appliquez le thème One Dark
          onChange={(value: string) => setJsonInput(value)}
        />
      </div>
      <Button onClick={handleSubmit} className="mt-2">
        Générer le Diagramme
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
