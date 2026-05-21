import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type Role = 'super_admin' | 'admin' | 'student';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  avatar_url: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  role: Role | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  role: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setProfile(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (currentUser: User) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error || !data) {
        // Create profile if doesn't exist
        const newRole: Role = currentUser.email === 'hpro453176@gmail.com' ? 'super_admin' : 'student';
        
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: currentUser.id, 
              email: currentUser.email,
              role: newRole,
              full_name: currentUser.user_metadata?.full_name || '',
              avatar_url: currentUser.user_metadata?.avatar_url || ''
            }
          ])
          .select()
          .single();
          
        if (!insertError && newProfile) {
          data = newProfile;
        }
      }

      if (data) {
        setProfile(data as Profile);
        setRole(data.role as Role);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
