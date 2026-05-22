import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function Gaming() {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<any[]>([]);
  const [consoleTab, setConsoleTab] = useState<'ps4'|'ps5'>('ps4');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [gameConsole, setGameConsole] = useState<'ps4'|'ps5'>('ps4');
  const [sessionType, setSessionType] = useState('Tournament');
  const [venue, setVenue] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase.from('gaming_sessions').select('*').order('created_at', { ascending: false });
      if (error && error.code !== '42P01') throw error; // Ignore table not found
      if (data) setSessions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !day || !month || !time) return;
    
    try {
      const { data, error } = await supabase.from('gaming_sessions').insert([{
        console: gameConsole,
        day,
        month,
        year: new Date().getFullYear().toString(),
        title: `${title} | ${sessionType}`,
        time: `${time}${venue ? ` | Venue: ${venue}` : ''}${details ? ` | ${details}` : ''}`
      }]).select().single();
      
      if (error) throw error;
      setSessions([data, ...sessions]);
      setShowModal(false);
      toast({ title: 'Session Added' });
      // Reset
      setDay(''); setMonth(''); setTitle(''); setTime(''); setVenue(''); setDetails(''); setSessionType('Tournament');
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this session?')) return;
    try {
      await supabase.from('gaming_sessions').delete().eq('id', id);
      setSessions(sessions.filter(s => s.id !== id));
      toast({ title: 'Deleted' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  const isAdmin = role === 'admin' || role === 'super_admin';
  const filteredSessions = sessions.filter(s => s.console === consoleTab);

  return (
    <div className="flex-1 bg-[#0c0018] text-white min-h-[calc(100vh-60px)] p-6 md:p-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#C44DFF] opacity-10 blur-[100px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h1 className="font-display text-6xl md:text-8xl text-[#C44DFF] drop-shadow-[4px_4px_0_#0A0A0A]">GAMING HUB</h1>
            <p className="text-xl text-gray-300 font-bold max-w-2xl mt-4">
              Tournaments, casual play, and leaderboards. Pick your console and show up.
            </p>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setShowModal(true)}
              className="mt-6 md:mt-0 bg-[#C44DFF] text-[#0A0A0A] font-bold uppercase px-6 py-3 neubrutalism-box hover:bg-white transition-colors"
            >
              + Add Session
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-12 border-b-[3px] border-[#0A0A0A] pb-4">
          <button 
            className={`font-display text-4xl px-4 py-2 transition-colors ${consoleTab === 'ps4' ? 'bg-[#FFE500] text-[#0A0A0A] neubrutalism-box' : 'text-gray-500 hover:text-white'}`}
            onClick={() => setConsoleTab('ps4')}
          >
            PLAYSTATION 4
          </button>
          <button 
            className={`font-display text-4xl px-4 py-2 transition-colors ${consoleTab === 'ps5' ? 'bg-white text-[#0A0A0A] neubrutalism-box' : 'text-gray-500 hover:text-white'}`}
            onClick={() => setConsoleTab('ps5')}
          >
            PLAYSTATION 5
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-gray-500 font-bold py-12">Loading sessions...</div>
        ) : filteredSessions.length === 0 ? (
          <div className="bg-[#0A0A0A] border-[3px] border-gray-800 p-12 text-center text-gray-500 font-bold">
            No active sessions scheduled for {consoleTab.toUpperCase()}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map(session => (
              <div key={session.id} className="bg-[#0A0A0A] border-[3px] border-[#C44DFF] p-6 flex flex-col group relative">
                {isAdmin && (
                  <button onClick={() => handleDelete(session.id)} className="absolute top-2 right-2 text-gray-600 hover:text-[#FF3B3B] bg-transparent font-bold">✕</button>
                )}
                
                <div className="flex gap-6 mb-6 items-center">
                  <div className="flex flex-col items-center bg-[#C44DFF] text-[#0A0A0A] p-3 border-[2px] border-[#0A0A0A]">
                    <span className="font-display text-4xl leading-none">{session.day}</span>
                    <span className="font-bold text-xs uppercase">{session.month}</span>
                  </div>
                  <div>
                    <span className="bg-white text-[#0A0A0A] text-[10px] font-bold px-2 py-1 uppercase border-[2px] border-[#0A0A0A]">{session.console}</span>
                    <p className="text-gray-400 font-bold mt-2">{session.time}</p>
                  </div>
                </div>
                
                <h3 className="font-display text-3xl text-white tracking-wide">{session.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-sm p-4">
          <div className="bg-[#F2EDE4] w-full max-w-md neubrutalism-box p-8 text-[#0A0A0A]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-4xl">NEW SESSION</h2>
              <button onClick={() => setShowModal(false)} className="text-2xl font-bold">✕</button>
            </div>
            
            <form onSubmit={handleAddSession} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-sm mb-1 block">Day (e.g. 15)</label>
                  <input required value={day} onChange={e=>setDay(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold" />
                </div>
                <div>
                  <label className="font-bold uppercase text-sm mb-1 block">Month (e.g. OCT)</label>
                  <input required value={month} onChange={e=>setMonth(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold uppercase" />
                </div>
              </div>
              
              <div>
                <label className="font-bold uppercase text-sm mb-1 block">Game Title</label>
                <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold" placeholder="FIFA 24 Tournament" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-sm mb-1 block">Session Type</label>
                  <select value={sessionType} onChange={e=>setSessionType(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold bg-white">
                    <option>Tournament</option>
                    <option>Training</option>
                    <option>Free Play</option>
                    <option>Challenge Match</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold uppercase text-sm mb-1 block">Venue</label>
                  <input required value={venue} onChange={e=>setVenue(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold" placeholder="ICT Lab" />
                </div>
              </div>
              
              <div>
                <label className="font-bold uppercase text-sm mb-1 block">Time</label>
                <input required value={time} onChange={e=>setTime(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold" placeholder="2:00 PM - 5:00 PM" />
              </div>
              
              <div>
                <label className="font-bold uppercase text-sm mb-1 block">Console</label>
                <select value={gameConsole} onChange={e=>setGameConsole(e.target.value as any)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold bg-white">
                  <option value="ps4">PS4</option>
                  <option value="ps5">PS5</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase text-sm mb-1 block">Session Details</label>
                <textarea value={details} onChange={e=>setDetails(e.target.value)} className="w-full border-[3px] border-[#0A0A0A] p-2 font-bold min-h-[80px]" placeholder="Controller rules, teams, entry limit, or prize details" />
              </div>
              
              <button type="submit" className="w-full bg-[#C44DFF] text-[#0A0A0A] font-display text-2xl py-3 border-[3px] border-[#0A0A0A] hover:bg-[#FFE500] mt-4 transition-colors">
                CREATE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
