export interface Task {
  task: string
  start_date: string
  end_date: string
}

export interface TeamMember {
  assignee: string
  tasks: Task[]
}

export interface ProjectData {
  project_name: string
  start_date: string
  end_date: string
  team: TeamMember[]
}

