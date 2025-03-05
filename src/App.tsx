import { useEffect, useState } from "react";
import {
  Entity,
  EntityProvider,
  ReplykeProvider,
  useSignTestingJwt,
} from "@replyke/react-js";
import { Toaster } from "./components/ui/toaster";
import { posts, users } from "./constants/dummy-data";
import SinglePost from "./components/SinglePost";
import DiscussionSheet from "./components/DiscussionSheet";

const projectId = import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID!;
const privateKey = import.meta.env.VITE_PUBLIC_REPLYKE_SECRET_KEY!;

function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const signTestingJwt = useSignTestingJwt();

  const [signedToken, setSignedToken] = useState<string>();
  const [entityForComments, setEntityForComments] = useState<Entity>();

  const handleSignJwt = async () => {
    const payload = users[0];

    const token = await signTestingJwt({
      projectId,
      payload,
      privateKey,
    });
    // Set the signed JWT in the state
    setSignedToken(token);
  };

  useEffect(() => {
    handleSignJwt();
  }, []);

  const handleOpen = (entity: Entity | undefined) => {
    setEntityForComments(entity);
    setIsSheetOpen(true);
  };

  return (
    <ReplykeProvider
      projectId="6fc3c1c7-d534-4453-a35d-e27777f981b7"
      signedToken={signedToken}
    >
      <Toaster />
      <EntityProvider entity={entityForComments}>
        <DiscussionSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </EntityProvider>
      <div className="h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-12 gap-4 md:gap-8 lg:gap-12 m-auto">
        {posts.map((post) => (
          <EntityProvider referenceId={post.id} key={post.id}>
            <SinglePost handleOpen={handleOpen} />
          </EntityProvider>
        ))}
      </div>
    </ReplykeProvider>
  );
}

export default App;
