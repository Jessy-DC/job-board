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

export type SerializedJob = ReturnType<typeof serializeJob>

export const serializeJob = (job: Job) => ({
    ...job,
    date: job.date.toISOString()
});

export const deserializeJob = (serializedJob: SerializedJob): Job => ({
    ...serializedJob,
    date: new Date(serializedJob.date)
});

