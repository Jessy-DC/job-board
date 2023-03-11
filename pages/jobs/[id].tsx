import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Layout} from "@/components/Layout";
import {
    getJob
} from "@/lib/jobs_server";
import {
    deserializeJob,
    SerializedJob,
    serializeJob
} from "@/lib/jobs";
import {formatDate} from "@/lib/dates";

const JobPage: NextPage<Props> = ({job: serializeJob}) => {
    const job = deserializeJob(serializeJob);

    return (
        <Layout title={`${job.jobTitle} at ${job.company}`}>
            <h2>{job.jobTitle}</h2>
            <p>
                <strong>{job.company}</strong>
            </p>
            <p>
                <small>Posted on {formatDate(job.date)}</small>
            </p>
            {job.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <p>
                <a href={job.applyUrl} target="_blank" rel="noreferrer">
                    Apply
                </a>
            </p>
        </Layout>
    );
};

export interface Props {
    job: SerializedJob;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const job = await getJob(context.params!.id as string);
    if (!job) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            job: serializeJob(job)
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export default JobPage;
