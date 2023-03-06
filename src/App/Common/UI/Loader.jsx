import { Ring } from "@uiball/loaders";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Ring size={40} lineWeight={5} speed={2} color="rgb(37,99,235)" />
    </div>
  );
};
