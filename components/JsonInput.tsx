import { useState } from "react"
import type { ProjectData } from "../types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface JsonInputProps {
  onDataSubmit: (data: ProjectData) => void
}

export function JsonInput({ onDataSubmit }: JsonInputProps) {
  const [jsonInput, setJsonInput] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput) as ProjectData
      onDataSubmit(parsedData)
      setError(null)
    } catch (e) {
      setError("Erreur de parsing JSON. Veuillez vérifier votre entrée.")
    }
  }

  return (
    <div className="mb-4">
      <Textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Entrez vos données JSON ici..."
        className="w-full h-64 mb-2"
      />
      <Button onClick={handleSubmit}>Générer le Diagramme</Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

