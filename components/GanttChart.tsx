"use client"

import { useRef, useMemo } from "react"
import type { ProjectData, TeamMember } from "../types"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import { format, eachDayOfInterval, startOfDay, endOfDay } from "date-fns"
import { fr } from "date-fns/locale"

interface GanttChartProps {
  data: ProjectData
}

export function GanttChart({ data }: GanttChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  // Calculer les dates du projet
  const projectStart = new Date(data.start_date)
  const projectEnd = new Date(data.end_date)

  // Générer tous les jours du projet
  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfDay(projectStart),
      end: endOfDay(projectEnd),
    })
  }, [projectStart, projectEnd])

  // Générer des couleurs pour chaque assigné
  const assigneeColors = useMemo(() => {
    const colors = ["bg-sky-200", "bg-rose-200", "bg-emerald-200", "bg-amber-200", "bg-violet-200", "bg-orange-200"]
    return Object.fromEntries(data.team.map((member, index) => [member.assignee, colors[index % colors.length]]))
  }, [data.team])

  // Calculer la largeur en pourcentage pour une tâche
  const getTaskStyle = (start: Date, end: Date) => {
    const totalDays = days.length
    const startIndex = days.findIndex((day) => format(day, "yyyy-MM-dd") === format(start, "yyyy-MM-dd"))
    const endIndex = days.findIndex((day) => format(day, "yyyy-MM-dd") === format(end, "yyyy-MM-dd"))
    const taskDuration = endIndex - startIndex + 1

    return {
      left: `${(startIndex / totalDays) * 100}%`,
      width: `${(taskDuration / totalDays) * 100}%`,
    }
  }

  const exportChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current)
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "gantt-chart.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const renderMemberTasks = (member: TeamMember) => (
    <div key={member.assignee} className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{member.assignee}</h3>
      {member.tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="flex items-stretch border-b relative">
          {/* Nom de la tâche */}
          <div className="w-1/4 flex-shrink-0 pr-4 py-2 font-medium">
            <div className="break-words">{task.task}</div>
          </div>

          {/* Barre de la tâche */}
          <div className="w-3/4 flex-grow relative py-2">
            <div
              className={`absolute top-2 bottom-2 ${assigneeColors[member.assignee]}`}
              style={{
                ...getTaskStyle(new Date(task.start_date), new Date(task.end_date)),
                borderRadius: "1vh",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-bold mb-4">{data.project_name}</h2>

      {/* Chart Container */}
      <div ref={chartRef} className="border rounded-lg bg-white p-6 w-full overflow-x-auto">
        <div className="w-full">
          {/* Header avec les dates de début et de fin */}
          <div className="flex border-b mb-4">
            {/* Espace pour les noms des tâches */}
            <div className="w-1/4 flex-shrink-0" />

            {/* Timeline */}
            <div className="w-3/4 flex-grow">
              <div className="flex justify-between py-2 px-4 text-sm font-medium">
                <span>{format(projectStart, "dd/MM/yyyy", { locale: fr })}</span>
                <span>{format(projectEnd, "dd/MM/yyyy", { locale: fr })}</span>
              </div>
            </div>
          </div>

          {/* Tasks grouped by assignee */}
          {data.team.map(renderMemberTasks)}
        </div>
      </div>

      <Button onClick={exportChart} className="mt-4">
        Exporter le graphique
      </Button>
    </div>
  )
}

