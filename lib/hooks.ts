import {useEffect, useState} from "react";
import type { JobSummary } from "@/lib/jobs";

export const useJobs = (page?: number, jobTitle?: string, company?: string) => {
    const [jobs, setJobs] = useState<JobSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        let query = [];

        if(page !== undefined) {
            query.push(`page=${page}`);
        }

        if(jobTitle !== undefined) {
            query.push(`jobTitle=${encodeURIComponent(jobTitle)}`);
        }

        if(company !== undefined) {
            query.push(`company=${encodeURIComponent(company)}`);
        }

        let isCurrentRequest = true;
        setLoading(true);
        setError(false);
        fetch(`/api/jobs?${query.join('&')}`)
            .then(res => res.json())
            .then(jobs => {
                if(isCurrentRequest) {
                    setJobs(jobs.map((job: any) => ({...job, date: new Date(job.date)})));
                }
            })
            .catch((err) => {
                if(isCurrentRequest) {
                    console.error(err);
                    setError(true);
                }
            })
            .finally(() => {
                if(isCurrentRequest) {
                    setLoading(false);
                }
            });
        return () => {
            isCurrentRequest = false;
        }
    }, [company, jobTitle, page]);

    return {jobs, loading, error};
}
