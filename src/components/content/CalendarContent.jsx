import { useState, useMemo } from "react"

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function CalendarHeader({ bulan, tahun, onPrev, onNext, onYearChange }) {
  const yearOptions = [];
  const thisYear = new Date().getFullYear();
  for (let y = thisYear - 10; y <= thisYear + 10; y++) {
    yearOptions.push(<option key={y} value={y}>{y}</option>);
  }
  return (
    <div className="flex items-center justify-between gap-2 mb-3 px-2">
      <button onClick={onPrev} className="p-1 border border-[#ebebeb] rounded-full hover:bg-neutral-100 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
      <span className="font-semibold text-lg">{monthNames[bulan]} {tahun}</span>
      <select value={tahun} onChange={onYearChange} className="border border-[#ebebeb] rounded-md px-2 py-1">
        {yearOptions}
      </select>
      <button onClick={onNext} className="p-1 border border-[#ebebeb] rounded-full hover:bg-neutral-100 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
}

function buildCalendar({ bulan, tahun, isLarge, today }) {
  const hariIni = today.getDate();
  const isCurrentMonth = bulan === today.getMonth() && tahun === today.getFullYear();
  const hariPertama = new Date(tahun, bulan, 1);
  const hariTerakhir = new Date(tahun, bulan + 1, 0);
  const jumlahHari = hariTerakhir.getDate();
  const hariTerakhirBulanSebelumnya = new Date(tahun, bulan, 0).getDate();
  const jumlahHariKosong = hariPertama.getDay();

  const calendar = [];
  let minggu = [];
  for (let i = jumlahHariKosong; i > 0; i--) {
    minggu.push(
      <div key={`prev-${i}`} className={`p-1 w-1/7 ${isLarge ? 'h-[168px] bg-[#f7f7f7] flex flex-col' : 'm-[2px] h-auto flex items-center justify-center'} text-neutral-400 p-2`}>
        {hariTerakhirBulanSebelumnya - i + 1}
      </div>
    );
  }
  for (let i = 1; i <= jumlahHari; i++) {
    const isHariIni = isCurrentMonth && i === hariIni;
    minggu.push(
      <div key={i} className={`w-1/7 ${isHariIni && !isLarge ? "bg-blue-400 text-white outfit-medium" : ""} ${isHariIni && isLarge ? "bg-blue-100/80" : ""} ${isLarge ? 'h-[168px] hover:bg-[#f7f7f7] flex flex-col gap-1' : 'h-auto mx-[2px] my-1 overflow-hidden flex flex-col items-center justify-start gap-1 rounded-md group hover:bg-[#ebebeb] hover:text-blue-500'} transition-all`}>
        <span className={`${isLarge ? "text-start rounded-br-xl p-2" : "text-center rounded-full"}`}>{i}</span>
        <div className={`${!isLarge ? "mx-auto w-3/5 flex items-center justify-center my-1 md:my-0 pb-[2px]" : "w-full flex flex-col gap-1 p-2"}`}>
          <div className={`flex items-center ${!isLarge ? "justify-center" : "bg-white justify-start ps-1 pe-2 py-1 gap-2 rounded-md shadow"}`}>
            <div className={`${isLarge ? "w-1 h-full" : "md:size-1 size-[6px]"} ${isHariIni && !isLarge ? "bg-white group-hover:bg-red-400" : "bg-red-400 transition-all"} rounded-full`}></div>
            <span className={`${isLarge ? "" : "hidden"} text-sm`}>Schedule</span>
          </div>
          <div className={`flex items-center ${!isLarge ? "justify-center" : "bg-white justify-start ps-1 pe-2 py-1 gap-2 rounded-md shadow"}`}>
            <div className={`${isLarge ? "w-1 h-full" : "md:size-1 size-[6px]"} ${isHariIni && !isLarge ? "bg-white group-hover:bg-yellow-400" : "bg-yellow-400 transition-all"} rounded-full`}></div>
            <span className={`${isLarge ? "" : "hidden"} text-sm`}>Schedule</span>
          </div>
          <div className={`flex items-center ${!isLarge ? "justify-center" : "bg-white justify-start ps-1 pe-2 py-1 gap-2 rounded-md shadow"}`}>
            <div className={`${isLarge ? "w-1 h-full" : "md:size-1 size-[6px]"} ${isHariIni && !isLarge ? "bg-white group-hover:bg-blue-500" : "bg-blue-500 transition-all"} rounded-full`}></div>
            <span className={`${isLarge ? "" : "hidden"} text-sm`}>Schedule</span>
          </div>
        </div>
      </div>
    );
    if (minggu.length === 7) {
      calendar.push(
        <div key={`minggu-${i}`} className={`w-full flex ${isLarge ? "divide-x-1 divide-[#ebebeb]" : "divide-y-2 divide-transparent"}`}>{minggu}</div>
      );
      minggu = [];
    }
  }
  if (minggu.length > 0) {
    let nextDate = 1;
    while (minggu.length < 7) {
      minggu.push(
        <div key={`next-${nextDate}`} className={`p-1 w-1/7 ${isLarge ? 'h-[168px] bg-[#f7f7f7] flex flex-col' : 'm-[2px] h-auto flex items-center justify-center'} text-neutral-400 p-2`}>
          {nextDate++}
        </div>
      );
    }
    calendar.push(
      <div key="minggu-terakhir" className={`w-full flex ${isLarge ? "divide-x-1 divide-[#ebebeb]" : ""}`}>{minggu}</div>
    );
  }
  return calendar;
}

function MiniCalendar({ bulan, tahun, onPrev, onNext, onYearChange, today }) {
  const calendar = buildCalendar({ bulan, tahun, isLarge: false, today });
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-4xl text-neutral-900 outfit-medium">Calendar</h1>
      <br />
      <CalendarHeader bulan={bulan} tahun={tahun} onPrev={onPrev} onNext={onNext} onYearChange={onYearChange} />
      <div className="w-full rounded-lg flex flex-col gap-2 px-[1rem] md:px-0">
        <div className="w-full flex">
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">SUN</div>
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">MON</div>
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">TUE</div>
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">WED</div>
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">THU</div>
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">FRI</div>
          <div className="py-2 flex items-center justify-center w-1/7 h-full text-neutral-600 text-[12px]">SAT</div>
        </div>
        <div className="w-full flex flex-col">
          {calendar}
        </div>
      </div>
      <div className="w-full mt-6 h-[1px] rounded-full bg-[#ebebeb]"></div>
      <div className="w-full p-4">
        <h1 className="text-2xl text-neutral-800 outfit-medium">Categories</h1>
        <div className="w-full flex flex-col gap-1 py-2">
          <div className="w-full flex items-center justify-start gap-2">
            <div className="size-2 bg-red-400 rounded-full"></div>
            <span className="text-md text-neutral-700">Important</span>
          </div>
          <div className="w-full flex items-center justify-start gap-2">
            <div className="size-2 bg-yellow-400 rounded-full"></div>
            <span className="text-md text-neutral-700">Priority</span>
          </div>
          <div className="w-full flex items-center justify-start gap-2">
            <div className="size-2 bg-blue-400 rounded-full"></div>
            <span className="text-md text-neutral-700">Side job</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalendarContent() {
  const today = useMemo(() => new Date(), []);
  const [bulan, setBulan] = useState(today.getMonth());
  const [tahun, setTahun] = useState(today.getFullYear());

  const handlePrevMonth = () => {
    if (bulan === 0) {
      setBulan(11);
      setTahun(tahun - 1);
    } else {
      setBulan(bulan - 1);
    }
  };
  const handleNextMonth = () => {
    if (bulan === 11) {
      setBulan(0);
      setTahun(tahun + 1);
    } else {
      setBulan(bulan + 1);
    }
  };
  const handleYearChange = (e) => {
    setTahun(Number(e.target.value));
  };

  const calendarLarge = buildCalendar({ bulan, tahun, isLarge: true, today });

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="h-full flex flex-col md:flex-row divide-x-1 divide-[#ebebeb]">
        <div className="w-full h-auto md:w-1/4 md:h-full md:overflow-y-auto">
          <MiniCalendar
            bulan={bulan}
            tahun={tahun}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            onYearChange={handleYearChange}
            today={today}
          />
        </div>
        <div className="w-full md:w-3/4 h-full md:overflow-y-auto p-4 grid">
          <div className="rounded-xl overflow-auto border border-[#ebebeb]">
            <div className="w-full rounded-full flex flex-col divide-y-1 divide-[#ebebeb]">
              <div className="w-[220%] md:w-full flex divide-x-1 divide-[#ebebeb] h-[62px]">
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">SUN</div>
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">MON</div>
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">TUE</div>
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">WED</div>
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">THU</div>
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">FRI</div>
                <div className="flex items-center justify-center w-1/7 h-full text-neutral-800 text-lg outfit-medium">SAT</div>
              </div>
              <div className="w-[220%] md:w-full flex flex-col divide-y-1 divide-[#ebebeb] bg-white">
                {calendarLarge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}