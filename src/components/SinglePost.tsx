import { useEntity } from "@replyke/react-js";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const SinglePost = ({
  handleOpen,
}: {
  handleOpen: (newReferenceId: string | undefined) => void;
}) => {
  const {
    entity,
    userDownvotedEntity,
    userUpvotedEntity,
    upvoteEntity,
    removeEntityUpvote,
    downvoteEntity,
    removeEntityDownvote,
  } = useEntity();

  const upvotesCount = entity?.upvotes.length || 0;
  const downvotesCount = entity?.downvotes.length || 0;

  const handleUpvote = () => {
    if (userUpvotedEntity) {
      removeEntityUpvote?.();
    } else {
      upvoteEntity?.();
    }
  };

  const handleDownvote = () => {
    if (userDownvotedEntity) {
      removeEntityDownvote?.();
    } else {
      downvoteEntity?.();
    }
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-lg">
      {/* Post Content */}
      <p className="text-lg font-bold text-gray-800">{entity?.referenceId}</p>
      <p className="text-gray-600 mt-2">{entity?.content}</p>

      {/* Voting Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Upvote Button */}
        <Button
          onClick={handleUpvote}
          size="sm"
          className={cn(
            "cursor-pointer",
            userUpvotedEntity
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-800"
          )}
        >
          {userUpvotedEntity ? "Upvoted" : "Upvote"}
          <span className="ml-2 text-gray-600">({upvotesCount})</span>
        </Button>

        {/* Downvote Button */}
        <Button
          onClick={handleDownvote}
          size="sm"
          className={cn(
            "cursor-pointer",
            userUpvotedEntity
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-800"
          )}
        >
          {userDownvotedEntity ? "Downvoted" : "Downvote"}
          <span className="ml-2 text-gray-600">({downvotesCount})</span>
        </Button>
      </div>

      {/* Open Discussion Button */}
      <Button
        onClick={() => handleOpen(entity?.id)}
        className="w-full mt-4 cursor-pointer"
      >
        Open Discussion{" "}
        {(entity?.repliesCount || 0) > 0 && `(${entity?.repliesCount})`}
      </Button>
    </div>
  );
};

export default SinglePost;
