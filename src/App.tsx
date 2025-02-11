import { EntityProvider, ReplykeProvider } from "@replyke/react-js";
import { Toaster } from "./components/ui/toaster";
import { posts } from "./constants/dummy-data";
import SinglePost from "./components/SinglePost";
import DiscussionSheet from "./components/DiscussionSheet";
import { useState } from "react";

function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [referenceId, setReferenceId] = useState<string>();

  const handleOpen = (newReferenceId: string | undefined) => {
    setReferenceId(newReferenceId);
    setIsSheetOpen(true);
  };

  return (
    <ReplykeProvider projectId="6fc3c1c7-d534-4453-a35d-e27777f981b7">
      <Toaster />
      <EntityProvider referenceId={referenceId}>
        <DiscussionSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </EntityProvider>
      <div className="h-screen grid grid-cols-4 p-12 gap-12 m-auto">
        {posts.map((post) => (
          <EntityProvider referenceId={post.id}>
            <SinglePost handleOpen={handleOpen} key={post.id} />
          </EntityProvider>
        ))}
      </div>
    </ReplykeProvider>
  );
}

export default App;
