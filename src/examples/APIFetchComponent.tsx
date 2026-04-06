import { useEffect } from "react";
import {
  fetchPostsFailure,
  fetchPostsSuccess,
  parseError,
} from "./apiFetchFunction";

function APIFetchComponent() {
  const data = fetchPostsSuccess();
  console.log(data);
  useEffect(() => {
    (async () => {
      try {
        const failure = await fetchPostsFailure();
        console.log(failure);
      } catch (error: unknown) {
        console.error("Error fetching posts:", parseError(error));
      }
    })();
  }, []);
  return <div>APIFetchComponent</div>;
}

export default APIFetchComponent;