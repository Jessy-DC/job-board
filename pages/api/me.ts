import {NextApiHandler} from "next";
import {getCurrentUser} from "@/lib/user_server";

const handle: NextApiHandler = async (req, res) => {
    res.json(await getCurrentUser({req}));
}

export default handle;
