import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "@aws-amplify/auth";

const session = await fetchAuthSession();
const token = session.tokens?.idToken

Amplify.configure(outputs, {
    API: {
        REST: {
            headers : async () => {
                return {
                    Authorization: token,
                }
            }
        }
    }
})