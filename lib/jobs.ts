import {Job} from '@prisma/client';

export type JobSummary = Omit<Job, 'applyUrl' | 'description'>;

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

export type SerializedJob = ReturnType<typeof serializeJob>;

export const serializeJob = (job: Job) => ({
    ...job,
    date: job.date.toISOString(),
});

export const deserializeJob = (serializedJob: SerializedJob): Job => ({
    ...serializedJob,
    date: new Date(serializedJob.date),
});
