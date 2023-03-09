import type { NextPage } from 'next';
import {JobList} from "@/components/JobList";
import {Layout} from "@/components/Layout";

const Home: NextPage<Props> = ({initialJobs: serializedInitialJobs}) => {
    const initialJobs = serializedInitialJobs.map(deserializeJobSummary);
    return (
        <Layout>
            <JobList initialJobs={initialJobs}/>
        </Layout>
    )
}

export interface Props {
    initialJobs: SerializedJobSummary[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const initialJobs = await getJobs({});
    return {
        props: {
            initialJobs: initialJobs.map(serializeJobSummary)
        }
    }
const Home: NextPage = () => {
  return (
    <Layout>
        <JobList />
    </Layout>
  )
}

export default Home;
