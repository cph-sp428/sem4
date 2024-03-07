export type task = {
    id? : number,
    title : string,
    description : string,
    status : 'active' | 'done' | 'deleted',
}

export const exampleTasks : task[] = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        status: 'active'
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        status: 'done'
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        status: 'deleted'
    }
];