import {JobSummary} from "./jobs";
import {GetJobsOptions} from "@/pages/api/jobs";
import {Job, User} from '@prisma/client';
import prisma from "./prisma_server";

export async function getJobs({
                                  page = 1,
                                  jobTitle,
                                  company
                              }: GetJobsOptions): Promise<JobSummary[]> {
    return prisma.job.findMany({
        select: {id: true, jobTitle: true, company: true, date: true},
        where: {
            jobTitle: {
                contains: jobTitle, mode: 'insensitive'
            },
            company: {
                contains: company, mode: 'insensitive'
            }
        },
        orderBy: {date: 'desc'},
        skip: (page - 1) * 10,
        take: 10,
    })
}

export const getJob = async (id: string): Promise<(Job & { user: User | null }) | undefined> => {
    const job = await prisma.job.findUnique({where: {id}, include: {user: true}});
    return job ?? undefined;
}
