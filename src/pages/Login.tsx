import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Login Berhasil',
          description: 'Selamat datang di Liammobilindo!',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login Gagal',
          description: 'Email atau password salah.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/30" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
              <Car className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Liammobilindo</h1>
              <p className="text-primary-foreground/70">Showroom Mobil Bekas Terpercaya</p>
            </div>
          </div>
          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl font-semibold leading-tight">
              Sistem Manajemen Showroom Modern & Terintegrasi
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Kelola stok kendaraan, transaksi, dan pembukuan dalam satu platform yang mudah
              digunakan.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-primary-foreground/70">Mobil Terjual</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-sm text-primary-foreground/70">Pelanggan Puas</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Car className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Liammobilindo</h1>
            </div>
          </div>

          <Card className="border-0 shadow-strong">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Masuk ke Akun</CardTitle>
              <CardDescription>
                Masukkan email dan password untuk mengakses sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@liammobilindo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-focus"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-focus pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full btn-gradient text-accent-foreground font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    'Masuk'
                  )}
                </Button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Akun Demo untuk Testing:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded-lg bg-secondary">
                    <span className="text-muted-foreground">Super Admin:</span>
                    <span className="font-mono">admin@liammobilindo.com / admin123</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-secondary">
                    <span className="text-muted-foreground">Stok:</span>
                    <span className="font-mono">stok@liammobilindo.com / stok123</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-secondary">
                    <span className="text-muted-foreground">Kasir:</span>
                    <span className="font-mono">kasir@liammobilindo.com / kasir123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
