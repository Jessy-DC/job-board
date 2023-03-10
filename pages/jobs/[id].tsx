import {GetServerSideProps ,NextPage} from "next";
import {useRouter} from "next/router";
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
    const router = useRouter();
    const jobId = router.query.id;

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

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
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

export default JobPage;
