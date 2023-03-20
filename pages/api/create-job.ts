import {NextApiHandler} from "next";
import {getToken} from "next-auth/jwt";
import {JobFormValues, validateJobFormValues} from "@/lib/jobForm";
import prisma from "@/lib/prisma_server";

const handle: NextApiHandler = async (req, res) => {
    if(req.method !== "POST") {
        res.status(405).send({ok: false})
        return;
    }

    const token = await getToken({req});
    if(!token) {
        res.status(401).send({ok: false})
        return;
    }

    const values: JobFormValues = JSON.parse(req.body);

    const errors = validateJobFormValues(values);
    if (Object.keys(errors).length > 0) {
        res.status(422).send(errors);
        return;
    }

    const job = await prisma.job.create({
        data: {
            jobTitle: values.jobTitle,
            company: values.company,
            description: values.description,
            applyUrl: values.applyUrl
        },
    });

    res.send({jobId: job.id});

    res.send({ok: true});
}

export default handle;
