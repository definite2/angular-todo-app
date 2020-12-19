export interface Task {
    id?: string,
    title: string,
    description: string,
    done?:boolean
}
export interface TaskDialogData {
    task: Partial<Task>,
    enableDelete: boolean
}
export interface TaskDialogResultData {
    task: Task,
    delete?: boolean
}


