import { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getCategoryColor = (category) => {
  switch (category) {
    case 'important': return 'bg-red-400';
    case 'priority': return 'bg-yellow-400';
    case 'sidejob': return 'bg-blue-400';
    default: return 'bg-gray-400';
  }
};

function CalendarHeader({ bulan, tahun, onPrev, onNext, onYearChange }) {
  const yearOptions = [];
  const thisYear = new Date().getFullYear();
  for (let y = thisYear - 10; y <= thisYear + 10; y++) {
    yearOptions.push(<option key={y} value={y}>{y}</option>);
  }
  return (
    <div className="flex items-center justify-between gap-2 mb-3 px-2">
      <button onClick={onPrev} className="p-1 border rounded-full hover:bg-neutral-100 transition-all">‹</button>
      <span className="font-semibold text-lg">{monthNames[bulan]} {tahun}</span>
      <select value={tahun} onChange={onYearChange} className="border rounded-md px-2 py-1">
        {yearOptions}
      </select>
      <button onClick={onNext} className="p-1 border rounded-full hover:bg-neutral-100 transition-all">›</button>
    </div>
  );
}

function buildCalendar({ bulan, tahun, isLarge, today, schedules, onDateClick }) {
  const isCurrentMonth = bulan === today.getMonth() && tahun === today.getFullYear();
  const hariIni = today.getDate();
  const hariPertama = new Date(tahun, bulan, 1);
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const jumlahHariKosong = hariPertama.getDay();
  const hariTerakhirBulanSebelumnya = new Date(tahun, bulan, 0).getDate();

  const calendar = [];
  let minggu = [];

  for (let i = jumlahHariKosong; i > 0; i--) {
    minggu.push(<div key={`prev-${i}`} className={`w-1/7 text-neutral-400 p-2`}>{hariTerakhirBulanSebelumnya - i + 1}</div>);
  }

  for (let i = 1; i <= jumlahHari; i++) {
    const isHariIni = isCurrentMonth && i === hariIni;
    const dateKey = `${tahun}-${String(bulan + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const matchedSchedules = schedules.filter(s => s.date === dateKey);

    minggu.push(
      <div
        key={i}
        onClick={() => onDateClick(i)}
        className={`w-1/7 cursor-pointer border p-2 rounded-md ${isHariIni ? 'bg-blue-100' : ''}`}
      >
        <span className="font-semibold">{i}</span>
        {isLarge ? (
          <div className="flex flex-col gap-1 mt-1">
            {matchedSchedules.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs truncate">
                <div className={`w-2 h-2 rounded-full ${getCategoryColor(s.category)}`}></div>
                <span className="text-neutral-700">{s.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-[2px] mt-1">
            {matchedSchedules.slice(0, 3).map((s, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full ${getCategoryColor(s.category)}`}></div>
            ))}
          </div>
        )}
      </div>
    );

    if (minggu.length === 7) {
      calendar.push(<div key={`minggu-${i}`} className="flex">{minggu}</div>);
      minggu = [];
    }
  }

  if (minggu.length > 0) {
    let next = 1;
    while (minggu.length < 7) {
      minggu.push(<div key={`next-${next}`} className="w-1/7 text-neutral-400 p-2">{next++}</div>);
    }
    calendar.push(<div key="minggu-terakhir" className="flex">{minggu}</div>);
  }

  return calendar;
}

function MiniCalendar({ bulan, tahun, onPrev, onNext, onYearChange, today, schedules, onDateClick }) {
  const calendar = buildCalendar({ bulan, tahun, isLarge: false, today, schedules, onDateClick });
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-2">Mini Calendar</h1>
      <CalendarHeader bulan={bulan} tahun={tahun} onPrev={onPrev} onNext={onNext} onYearChange={onYearChange} />
      <div className="grid grid-cols-7 text-center text-xs font-medium text-neutral-700 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="flex flex-col gap-1">{calendar}</div>
    </div>
  );
}

export default function CalendarContentSecond() {
  const today = useMemo(() => new Date(), []);
  const [bulan, setBulan] = useState(today.getMonth());
  const [tahun, setTahun] = useState(today.getFullYear());
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', category: 'important' });

  const handlePrevMonth = () => bulan === 0 ? (setBulan(11), setTahun(tahun - 1)) : setBulan(bulan - 1);
  const handleNextMonth = () => bulan === 11 ? (setBulan(0), setTahun(tahun + 1)) : setBulan(bulan + 1);
  const handleYearChange = (e) => setTahun(Number(e.target.value));

  const handleDateClick = (day) => {
    setSelectedDate(`${tahun}-${String(bulan + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    setShowModal(true);
  };

  const fetchSchedules = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3002/schedule?month=${bulan + 1}&year=${tahun}`);
      const data = res.data.map(item => ({
        ...item,
        date: item.date.split('T')[0]
      }));
      console.log("Schedules yang dimuat:", data);
      setSchedules(data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  }, [bulan, tahun]);

  const handleSaveSchedule = async () => {
    if (!selectedDate) return;
    try {
      await axios.post('http://localhost:3002/schedule', {
        ...form,
        date: selectedDate
      });
      setShowModal(false);
      setForm({ title: '', description: '', category: 'important' });
      fetchSchedules();
    } catch (err) {
      console.error("Gagal menyimpan schedule:", err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [bulan, tahun, fetchSchedules]);

  const calendarLarge = buildCalendar({
    bulan, tahun, isLarge: true, today, schedules,
    onDateClick: handleDateClick
  });

  return (
    <div className="w-full h-full flex p-4 overflow-y-auto">
      <div className="md:w-1/4 border-r overflow-y-auto">
        <MiniCalendar
          bulan={bulan}
          tahun={tahun}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          onYearChange={handleYearChange}
          today={today}
          schedules={schedules}
          onDateClick={handleDateClick}
        />
      </div>

      <div className="md:w-3/4 p-4 overflow-y-auto">
        <CalendarHeader bulan={bulan} tahun={tahun} onPrev={handlePrevMonth} onNext={handleNextMonth} onYearChange={handleYearChange} />
        <div className="flex flex-col gap-2 mt-4">
          <div className="grid grid-cols-7 text-center font-bold text-neutral-700">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="flex flex-col gap-1">{calendarLarge}</div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
            <h2 className="text-lg font-bold mb-2">Add Schedule</h2>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mb-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <select
              className="border p-2 w-full mb-4"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="important">Important</option>
              <option value="priority">Priority</option>
              <option value="sidejob">Side Job</option>
            </select>
            <div className="flex justify-between">
              <button onClick={handleSaveSchedule} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setShowModal(false)} className="text-red-500">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
