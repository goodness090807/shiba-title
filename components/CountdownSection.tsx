const CountdownSection = ({
  settingCountDown,
  countdown,
  children,
}: {
  settingCountDown: number;
  countdown: number;
  children: React.ReactNode;
}) => {
  // 計算剩餘時間的百分比（0-100）
  const remainingPercentage = settingCountDown > 0 ? (countdown / settingCountDown) * 100 : 0;

  // 計算圓周長
  const radius = 45; // 半徑百分比
  const circumference = 2 * Math.PI * radius;

  // 計算strokeDashoffset
  // 當 remainingPercentage = 100% 時，strokeDashoffset = 0（完全填滿）
  // 當 remainingPercentage = 0% 時，strokeDashoffset = circumference（完全空白）
  const strokeDashoffset = circumference - (circumference * remainingPercentage) / 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* SVG Circle Progress */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" className="opacity-20" />

        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s linear",
          }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Time Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl md:text-5xl font-bold text-gray-800 tabular-nums">{formatTime(countdown)}</div>
        {children}
      </div>
    </div>
  );
};

export default CountdownSection;
