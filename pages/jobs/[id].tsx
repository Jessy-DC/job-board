import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import {Layout} from "@/components/Layout";
import {formatDate} from "@/lib/dates";
import {getJob} from "@/lib/jobs_server";
import {Job, SerializedJob, serializeJob, deserializeJob} from "@/lib/jobs";

const JobPage: NextPage<Props> = ({job: serializeJob}) => {
    const job = deserializeJob(serializeJob);
    return (
        <Layout title={`${job.jobTitle} at ${job.company}`}>
            <h2>{job.jobTitle}</h2>
            <p>Posted on {formatDate(job.date)}</p>
            <p>
                <strong>{job.company}</strong>
            </p>
            <p>
                <small>Posted on {formatDate(job.date)}</small>
            </p>
            {job.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <a href={job.applyUrl} target="_blank" rel="noreferrer">
                Apply
            </a>
        </Layout>
    )
}

export interface Props {
    job: SerializedJob
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params!.id;
    const job = await getJob(id as string);
    if(!job) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            job: serializeJob(job)
        }
    }
}

export default JobPage;
