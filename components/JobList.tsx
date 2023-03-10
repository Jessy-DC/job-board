import {formatDate} from '@/lib/dates';
import {useJobs} from "@/lib/hooks";
import {useState} from "react";
import {JobSummary} from "@/lib/jobs";
import Link from "next/link";

export interface Props {
    initialJobs: JobSummary[]
}

export const JobList = ({initialJobs}: Props) => {
    const [page, setPage] = useState(1);
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const {loading, error, jobs} = useJobs(initialJobs, page, jobTitle, company);

    return (
        <>
            <div>
                <label>
                    Company : {' '}
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </label>
                <label>
                    Job title : {' '}
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </label>
            </div>
            {jobs.length > 0 ? (
                <ul>
                    {jobs.map((job) => (
                        <li key={job.id}>
                            <Link href={`/jobs/${job.id}`}>
                                <strong>{job.jobTitle}</strong> at <em>{job.company}</em> {' '}
                            </Link>
                            <small>{formatDate(job.date)}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <li>No job to display</li>
            )}

            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous page</button>
                <button onClick={() => setPage(page + 1)} disabled={jobs.length < 10}>Next page</button>
            </div>
            {loading && <div>Loading jobs...</div>}
            {error && <div>An error occured while loading jobs.</div>}
        </>
    )
}
