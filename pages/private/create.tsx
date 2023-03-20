import {ErrorMessage, Field, Form, Formik} from 'formik';
import {NextPage} from "next";
import {Layout} from "@/components/Layout";
import {JobFormValues, validateJobFormValues} from "@/lib/jobForm";
import {useRouter} from "next/router";

const PostJobPage: NextPage = () => {
    const router = useRouter();
    return (
        <Layout title="Post a job">
            <h2>Post a new job</h2>
            <Formik<JobFormValues>
                initialValues={{
                    jobTitle: '',
                    company: '',
                    description: '',
                    applyUrl: ''
                }}
                onSubmit={(values) => {
                    fetch('/api/create-job', {
                        method: 'POST',
                        body: JSON.stringify(values)
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.jobId) {
                                router.push(`/jobs/${res.jobId}`)
                            }
                        })
                        .catch((err) => {
                            console.error(err)
                        });
                }}
                validate={validateJobFormValues}
            >
                <Form>
                    <section>
                        <label htmlFor="jobTitle">Job title</label>
                        <Field id="jobTitle" type="text" name="jobTitle" placeholder="e.g 'Chief Geek'"/>
                        <span className="error">
                            <ErrorMessage name="jobTitle"/>
                        </span>
                    </section>
                    <section>
                        <label htmlFor="company">Company name</label>
                        <Field id="company" type="text" name="company" placeholder="e.g 'Oceans Clean Up'"/>
                        <span className="error">
                            <ErrorMessage name="company"/>
                        </span>
                    </section>
                    <section>
                        <label htmlFor="description">Description</label>
                        <Field id="description" as="textarea" name="description"
                               placeholder="e.g 'We are looking for a Chief Geek to lead our team of geeks'"/>
                        <span className="error">
                            <ErrorMessage name="description"/>
                        </span>
                    </section>
                    <section>
                        <label htmlFor="applyUrl">Apply URL</label>
                        <Field id="applyUrl" type="url" name="applyUrl"
                               placeholder="e.g 'https://www.oceanscleanup.com/careers'"/>
                        <span className="error">
                            <ErrorMessage name="applyUrl"/>
                        </span>
                    </section>
                    <button type="submit">Create</button>
                </Form>
            </Formik>
        </Layout>
    )
}

export default PostJobPage;
