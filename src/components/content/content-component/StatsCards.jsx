export default function StatsCards({ totalLoan }) {
  return (
    <div className="w-full grid md:flex items-center flex-wrap gap-4 px-4 py-2">
      <Card
        title="This month loan"
        iconColor="bg-slate-100"
        amount={`$${totalLoan}`}
        trend="+13.65%"
        trendColor="text-green-500"
        bgColor="bg-green-100"
      />
      <Card
        title="Total loans this week"
        iconColor="bg-slate-100"
        amount="43"
        trend="+26.47%"
        trendColor="text-green-500"
        bgColor="bg-green-100"
      />
      <Card
        title="Warnings"
        iconColor="bg-yellow-300/80"
        amount="7"
        trend="+2"
        trendColor="text-red-500"
        bgColor="bg-red-100"
      />
    </div>
  );
}

function Card({ title, iconColor, amount, trend, trendColor, bgColor }) {
  return (
    <div className="w-full md:w-[32%] h-[8rem] rounded-lg border border-[#ebebeb] shadow px-6 py-4 hover:bg-[#fafafa] hover:shadow-lg transition-all">
      <div className="flex flex-col justify-between h-full gap-2">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-md ${iconColor}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-neutral-800" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <span className="text-md text-neutral-900 outfit-medium text-nowrap">{title}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021" />
          </svg>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-green-500 via-indigo-400 to-red-400 outfit-medium">{amount}</span>
          <div className={`px-2 py-1 rounded-md ${bgColor} flex gap-1 items-center`}>
            <span className={`text-xs ${trendColor} outfit-thin`}>{trend}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`size-3 ${trendColor}`} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
