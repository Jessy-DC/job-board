import {ErrorMessage, Field, Form, Formik} from "formik";
import {JobFormValues, validateJobFormValues} from "@/lib/jobForm";

export interface Props {
    initialValues: JobFormValues;
    onSubmit: (values: JobFormValues) => void;
    buttonText: string;
}

export const JobForm = ({initialValues, onSubmit, buttonText}: Props) => {
    return (
            <Formik<JobFormValues>
                initialValues={initialValues}
                onSubmit={onSubmit}
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
                    <button type="submit">{buttonText}</button>
                </Form>
            </Formik>
    )
}
