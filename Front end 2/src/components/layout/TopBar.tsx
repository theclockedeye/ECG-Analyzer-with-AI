import { ThemeToggle } from '../ui/ThemeToggle';

export function TopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between bg-white/80 px-4 backdrop-blur-md dark:bg-gray-900/80">
      <div className="flex items-center ml-[240px] space-x-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          ECG Analyzer
        </h1>
        <span className="text-sm font-medium text-gray-700 dark:text-white">
          John Doe
        </span>
      </div>

      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}