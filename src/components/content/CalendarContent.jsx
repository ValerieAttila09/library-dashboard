import { useState } from "react"

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function CalendarContent() {
  const today = new Date();
  const [bulan, setBulan] = useState(today.getMonth());
  const [tahun, setTahun] = useState(today.getFullYear());

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
      <td key={`prev-${i}`} className="px-3 py-2 border-l-1 border-[#ebebeb] text-neutral-400 text-center">
        {hariTerakhirBulanSebelumnya - i + 1}
      </td>
    );
  }

  for (let i = 1; i <= jumlahHari; i++) {
    const isHariIni = isCurrentMonth && i === hariIni;
    minggu.push(
      <td key={i} className={`${isHariIni ? 'bg-green-100' : "bg-white"} px-3 py-2 text-center border-l-1 border-[#ebebeb] hover:bg-[#ebebeb] transition-all`}>{i}</td>
    );
    if (minggu.length === 7) {
      calendar.push(
        <tr key={`minggu-${i}`}>{minggu}</tr>
      );
      minggu = [];
    }
  }

  if (minggu.length > 0) {
    let nextDate = 1;
    while (minggu.length < 7) {
      minggu.push(
        <td key={`next-${nextDate}`} className="px-3 py-2 border-l-1 border-[#ebebeb] text-neutral-400 text-center">
          {nextDate++}
        </td>
      );
    }
    calendar.push(
      <tr key="minggu-terakhir">{minggu}</tr>
    );
  }

  const yearOptions = [];
  for (let y = today.getFullYear() - 10; y <= today.getFullYear() + 10; y++) {
    yearOptions.push(<option key={y} value={y}>{y}</option>);
  }

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

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="">
        <div className="w-full p-4 grid">
          <div className="flex items-center justify-center gap-2 mb-4">
            <button onClick={handlePrevMonth} className="p-1 border border-[#ebebeb] rounded-full hover:bg-neutral-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
            <span className="font-semibold text-lg">{monthNames[bulan]}</span>
            <select value={tahun} onChange={handleYearChange} className="border border-[#ebebeb] rounded-full px-2 py-1 hover:bg-[#ebebeb] transition-all">
              {yearOptions}
            </select>
            <button onClick={handleNextMonth} className="p-1 border border-[#ebebeb] rounded-full hover:bg-neutral-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-neutral-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
          <div className="rounded-xl overflow-hidden py-4 border border-[#ebebeb]">
            <table className="w-full rounded-xl">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">M</th>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">S</th>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">S</th>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">R</th>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">K</th>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">J</th>
                  <th className="px-2 py-1 text-neutral-800 sg-medium bg-[#f7f7f7] border-l-1 border-[#ebebeb]">S</th>
                </tr>
              </thead>
              <tbody>
                {calendar}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}