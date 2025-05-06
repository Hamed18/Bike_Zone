import { Loader } from "lucide-react";

const LoadAnimation = () => {
  return (
    <div className="grid place-content-center min-h-96">
      <Loader className="animate-ping" />
    </div>
  );
};

export default LoadAnimation;
