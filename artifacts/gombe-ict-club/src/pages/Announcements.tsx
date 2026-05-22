import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function Announcements() {
  const { role } = useAuth();
  const { toast } = useToast();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '', tag: 'INFO', event_date: '', event_time: '', venue: '' });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
      if (error && error.code !== '42P01') throw error;
      if (data) setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        body: [
          formData.body,
          formData.event_date ? `\nSchedule: ${formData.event_date}${formData.event_time ? ` at ${formData.event_time}` : ''}` : '',
          formData.venue ? `Venue: ${formData.venue}` : '',
        ].filter(Boolean).join('\n'),
        tag: formData.tag,
        created_at: new Date().toISOString()
      };
      const { error } = await supabase.from('announcements').insert([payload]);
      if (error) throw error;
      toast({ title: 'Announcement posted' });
      setShowModal(false);
      setFormData({ title: '', body: '', tag: 'INFO', event_date: '', event_time: '', venue: '' });
      fetchNews();
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete announcement?')) return;
    try {
      await supabase.from('announcements').delete().eq('id', id);
      setNews(news.filter(n => n.id !== id));
      toast({ title: 'Deleted' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  const isAdmin = role === 'admin' || role === 'super_admin';

  const getTagColor = (tag: string) => {
    switch(tag.toUpperCase()) {
      case 'URGENT': return 'bg-[#FF3B3B] text-white';
      case 'EVENT': return 'bg-[#2563FF] text-white';
      case 'UPDATE': return 'bg-[#00E676] text-[#0A0A0A]';
      default: return 'bg-gray-300 text-[#0A0A0A]';
    }
  };

  return (
    <div className="flex-1 bg-[#F2EDE4] text-[#0A0A0A] min-h-[calc(100vh-60px)] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b-[4px] border-[#0A0A0A] pb-6">
          <h1 className="font-display text-6xl md:text-8xl leading-none">CLUB NEWS</h1>
          {isAdmin && (
            <button onClick={() => setShowModal(true)} className="bg-[#FFE500] text-[#0A0A0A] px-6 py-2 font-bold uppercase neubrutalism-box-sm border-[3px] border-[#0A0A0A]">
              + Admin Post
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center font-bold">Loading...</div>
        ) : news.length === 0 ? (
          <div className="bg-white border-[3px] border-[#0A0A0A] p-12 text-center neubrutalism-box">
            <p className="font-bold text-xl">No announcements yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map(item => {
              const date = new Date(item.created_at);
              return (
                <div key={item.id} className="bg-white border-[3px] border-[#0A0A0A] neubrutalism-box p-0 flex flex-col md:flex-row relative">
                  {isAdmin && (
                    <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 bg-[#FF3B3B] text-white px-2 font-bold border-[2px] border-[#0A0A0A]">✕</button>
                  )}
                  
                  {/* Date Block */}
                  <div className="bg-[#0A0A0A] text-white p-6 md:w-32 flex flex-col justify-center items-center shrink-0 border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#0A0A0A]">
                    <span className="font-display text-5xl leading-none text-[#FFE500]">{format(date, 'dd')}</span>
                    <span className="font-bold uppercase tracking-widest text-sm">{format(date, 'MMM')}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1">
                    <div className="mb-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 border-[2px] border-[#0A0A0A] ${getTagColor(item.tag)}`}>
                        {item.tag}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl mb-4">{item.title}</h2>
                    <div className="prose prose-sm font-medium text-gray-800 whitespace-pre-wrap">
                      {item.body}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg neubrutalism-box p-8">
            <h2 className="font-display text-4xl mb-6 text-[#0A0A0A]">POST ANNOUNCEMENT</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-bold uppercase text-xs mb-1 block">Title</label>
                <input required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full border-[3px] border-[#0A0A0A] p-2" />
              </div>
              
              <div>
                <label className="font-bold uppercase text-xs mb-1 block">Tag</label>
                <select value={formData.tag} onChange={e=>setFormData({...formData, tag: e.target.value})} className="w-full border-[3px] border-[#0A0A0A] p-2 bg-white">
                  <option value="INFO">INFO</option>
                  <option value="EVENT">EVENT</option>
                  <option value="UPDATE">UPDATE</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase text-xs mb-1 block">Message</label>
                <textarea required value={formData.body} onChange={e=>setFormData({...formData, body: e.target.value})} className="w-full border-[3px] border-[#0A0A0A] p-2 min-h-[150px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold uppercase text-xs mb-1 block">Schedule Date</label>
                  <input type="date" value={formData.event_date} onChange={e=>setFormData({...formData, event_date: e.target.value})} className="w-full border-[3px] border-[#0A0A0A] p-2" />
                </div>
                <div>
                  <label className="font-bold uppercase text-xs mb-1 block">Time</label>
                  <input type="time" value={formData.event_time} onChange={e=>setFormData({...formData, event_time: e.target.value})} className="w-full border-[3px] border-[#0A0A0A] p-2" />
                </div>
                <div>
                  <label className="font-bold uppercase text-xs mb-1 block">Venue</label>
                  <input value={formData.venue} onChange={e=>setFormData({...formData, venue: e.target.value})} className="w-full border-[3px] border-[#0A0A0A] p-2" placeholder="ICT Lab" />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 py-3 border-[3px] border-[#0A0A0A] font-bold uppercase hover:bg-gray-100">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#FFE500] text-[#0A0A0A] font-bold uppercase border-[3px] border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
