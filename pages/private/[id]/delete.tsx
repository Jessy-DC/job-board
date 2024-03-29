import {GetServerSideProps, NextPage} from "next";
import {useRouter} from "next/router";
import {SerializedJob, serializeJob} from "@/lib/jobs";
import {getJob} from "@/lib/jobs_server";
import {getCurrentUser} from "@/lib/user_server";
import {Layout} from "@/components/Layout";

export interface Props {
    job: SerializedJob | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const jobId = String(context.query.id);
    const job = await getJob(jobId);
    if(!job) {
        return {
            notFound: true,
        }
    }

    const user = await getCurrentUser({req: context.req});
    if(!user) {
        throw new Error("Missing user");
    }

    if(user.id !== job.userId) {
        context.res.statusCode = 403;
        return {
            props: {job: null}
        }
    }

    return {
        props: {
            job: serializeJob(job)
        }
    }
}

const DeleteJobPage: NextPage<Props> = ({job}) => {
    const router = useRouter();

    if(!job) {
        return (<Layout title="Unauthorized">
                <p>You are not authorized to access this page.</p>
            </Layout>
        )
    }

    return (
        <Layout title={`Delete job ${job.jobTitle} at ${job.company}`}>
            <h2>Are you sure ?</h2>
            <p>
                The job <strong>{job.jobTitle}</strong> at {' '} <strong>{job.company}</strong> will be permanently deleted.
            </p>
            <button onClick={() => {
                fetch(`/api/delete-job?id=${job.id}`, {method: 'POST'})
                    .then((res) => res.json())
                    .then((res) => {
                        if(res.ok) {
                            router.push('/');
                        }
                    })
                    .catch(console.error)
            }}>
                Yes, delete the job ad
            </button>
        </Layout>
    )
}

export default DeleteJobPage;
