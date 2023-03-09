export interface Job {
    id: string,
    jobTitle: string,
    company: string,
    description: string,
    applyUrl: string,
    date: Date
}

export type JobSummary = Omit<Job, 'applyUrl' | 'description'>;

export const toJob = (obj: any): Job => ({...obj, date: new Date(obj.date)});

export const toJobSummary = (job: Job): JobSummary => {
    const {description, applyUrl, ...jobSummary} = job;
    return jobSummary;
}

export type SerializedJobSummary = ReturnType<typeof serializeJobSummary>
export const serializeJobSummary = (jobSummary: JobSummary) => ({
    ...jobSummary,
    date: jobSummary.date.toISOString(),
})
export const deserializeJobSummary = (
    serializedJobSummary: SerializedJobSummary
): JobSummary => ({
    ...serializedJobSummary,
    date: new Date(serializedJobSummary.date),
})
