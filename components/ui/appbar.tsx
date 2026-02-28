import { Logo } from "./logo";
import { SidebarTrigger } from "./sidebar";

export const Appbar = () => {
  return (
    <div className="flex flex-row align-middle  w-full h-12 bg-primary text-white">
      <Logo />
    </div>
  );
};
