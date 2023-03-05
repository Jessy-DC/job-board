import {NextApiHandler} from "next";
import {getJobs} from "@/lib/jobs_server";

export interface GetJobsOptions {
    page?: number;
    jobTitle?: string;
    company?: string;
}

const handle: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).end();
        return;
    }
    const getJobsOptions: GetJobsOptions = {};
    if (req.query.page) {
        const page = Number(req.query.page);
        if (isNaN(page) || page < 1) {
            res.status(422).send('Invalid page number');
            return;
        }
        getJobsOptions.page = page;
    }
    if (req.query.jobTitle) {
        if (typeof req.query.jobTitle !== 'string') {
            res.status(422).send('Invalid job title filter');
            return;
        }
        getJobsOptions.jobTitle = req.query.jobTitle;
    }

    if (req.query.company) {
        if (typeof req.query.company !== 'string') {
            res.status(422).send('Invalid company filter');
            return;
        }
        getJobsOptions.company = req.query.company;
    }

    const jobs = await getJobs(getJobsOptions);
    res.send(jobs);
}

export default handle;
