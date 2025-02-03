"use client"

import { useState } from "react"
import { JsonInput } from "../components/JsonInput"
import { GanttChart } from "../components/GanttChart"
import type { ProjectData } from "../types"

export default function Home() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null)

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Générateur de Diagramme de Gantt</h1>
      <JsonInput onDataSubmit={setProjectData}/>
      {projectData && <GanttChart data={projectData} />}
    </div>
  )
}

