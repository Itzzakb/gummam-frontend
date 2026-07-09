import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';

type AuthView = 'login' | 'forgot-password' | 'otp' | 'reset-password' | 'success';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [authView, setAuthView] = useState<AuthView>('login');
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [error, setError] = useState('');

  // Forgot password fields
  const [forgotEmail, setForgotEmail] = useState('');

  // OTP fields
  const [otp, setOtp] = useState(['', '', '', '']);

  // Reset password fields
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('Admin login with:', email, password);
    navigate('/admin/overview');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email or mobile number.');
      return;
    }
    setError('');
    setAuthView('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, '').slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = nextValue;
    setOtp(nextOtp);

    if (nextValue && index < nextOtp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      previousInput?.focus();
    }
  };

  const handleOtpVerify = () => {
    if (otp.some(digit => digit === '')) {
      setError('Please enter the full 4-digit code.');
      return;
    }
    setError('');
    setAuthView('reset-password');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassword || !resetConfirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (resetPassword !== resetConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setAuthView('success');
  };

  const handleGoToLogin = () => {
    // Reset all state
    setEmail('');
    setPassword('');
    setForgotEmail('');
    setOtp(['', '', '', '']);
    setResetPassword('');
    setResetConfirmPassword('');
    setShowLoginPassword(false);
    setShowResetPassword(false);
    setShowResetConfirmPassword(false);
    setError('');
    setAuthView('login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] rounded-[30px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
        <div className="flex flex-col items-center">
          {/* Logo (shown unless we are on the Success screen, just like AuthDialog hides it or shows success style) */}
          {authView !== 'success' && (
            <div className="mb-6 flex justify-center">
              <img src="/images/main-logo-2.png" alt="Gummaam" className="h-9 w-auto" />
            </div>
          )}

          {/* Heading Section */}
          {authView !== 'success' && (
            <div className="mx-auto max-w-[320px] text-center lg:max-w-[340px]">
              <h1 className="text-[2.35rem] font-bold tracking-tight text-[#0B56A2] sm:text-[2.9rem] leading-none">
                {authView === 'login' && 'ADMIN LOG IN'}
                {authView === 'forgot-password' && (
                  <>
                    FORGOT
                    <br />
                    PASSWORD
                  </>
                )}
                {authView === 'otp' && 'ENTER OTP'}
                {authView === 'reset-password' && (
                  <>
                    RESET
                    <br />
                    PASSWORD
                  </>
                )}
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {authView === 'login' && 'Please sign in to your administrator account'}
                {authView === 'forgot-password' && 'Recover access to your administrator account'}
                {authView === 'otp' && (
                  <>
                    A 4 digit code has been sent to
                    <br />
                    <span className="font-semibold text-[#0B56A2]">{forgotEmail || 'your register email/mobile'}</span>
                  </>
                )}
                {authView === 'reset-password' && 'Create a new password for your admin account'}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && authView !== 'success' && (
            <div className="mt-4 w-full text-center text-sm font-medium text-red-500">
              {error}
            </div>
          )}

          {/* Views */}
          {authView === 'login' && (
            <form onSubmit={handleLogin} className="mx-auto mt-7 w-full max-w-[320px] space-y-4 lg:max-w-[340px]">
              <div className="space-y-2">
                <label htmlFor="admin-email" className="block text-left text-[13px] font-medium text-slate-900">
                  Email/Mobile no.
                </label>
                <Input
                  id="admin-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email/mobile no."
                  className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-password" className="block text-left text-[13px] font-medium text-slate-900">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowLoginPassword((value) => !value)}
                    variant="ghost"
                    size="icon-sm"
                    className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setError('');
                    setAuthView('forgot-password');
                  }}
                  className="h-auto px-0 text-xs font-semibold text-[#0B56A2] hover:text-[#083D76]"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="flex h-11 w-full items-center justify-between rounded-full bg-[#035096] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#024078]"
              >
                <span>Log In</span>
                <svg
                  viewBox="0 0 28 24"
                  aria-hidden="true"
                  className="h-5 w-10 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h22" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16 4 8 8-8 8" />
                </svg>
              </Button>
            </form>
          )}

          {authView === 'forgot-password' && (
            <form onSubmit={handleForgotSubmit} className="mx-auto mt-7 w-full max-w-[320px] space-y-6 lg:max-w-[340px]">
              <div className="space-y-2">
                <label htmlFor="forgot-email" className="block text-left text-[13px] font-medium text-slate-900">
                  Email/Mobile no.
                </label>
                <Input
                  id="forgot-email"
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter email/mobile no."
                  className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                />
              </div>

              <Button
                type="submit"
                className="flex h-11 w-full items-center justify-between rounded-full bg-[#035096] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#024078]"
              >
                <span>Continue</span>
                <svg
                  viewBox="0 0 28 24"
                  aria-hidden="true"
                  className="h-5 w-10 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h22" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16 4 8 8-8 8" />
                </svg>
              </Button>

              <p className="text-center text-sm text-slate-800">
                Remembered your password?{' '}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setError('');
                    setAuthView('login');
                  }}
                  className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                >
                  Login
                </Button>
              </p>
            </form>
          )}

          {authView === 'otp' && (
            <div className="mx-auto mt-7 w-full max-w-[320px] space-y-6 lg:max-w-[340px]">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <Input
                    key={`otp-${index}`}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleOtpChange(index, event.target.value)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    className="h-10 w-10 rounded-md border-0 bg-[#035096] px-0 text-center text-base font-semibold text-white shadow-none focus-visible:ring-2 focus-visible:ring-[#0B56A2]/20"
                  />
                ))}
              </div>

              <p className="text-center text-xs text-slate-700">
                Didn't receive OTP?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto px-0 text-xs font-medium text-[#0B56A2] hover:text-[#083D76]"
                >
                  Resend
                </Button>
              </p>

              <Button
                type="button"
                onClick={handleOtpVerify}
                className="flex h-11 w-full items-center justify-between rounded-full bg-[#035096] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#024078]"
              >
                <span>Verify</span>
                <svg
                  viewBox="0 0 28 24"
                  aria-hidden="true"
                  className="h-5 w-10 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h22" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16 4 8 8-8 8" />
                </svg>
              </Button>

              <p className="text-center text-sm text-slate-800">
                Wrong email or mobile?{' '}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setError('');
                    setAuthView('forgot-password');
                  }}
                  className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                >
                  Go back
                </Button>
              </p>
            </div>
          )}

          {authView === 'reset-password' && (
            <form onSubmit={handleResetSubmit} className="mx-auto mt-7 w-full max-w-[320px] space-y-4 lg:max-w-[340px]">
              <div className="space-y-2">
                <label htmlFor="reset-password" className="block text-left text-[13px] font-medium text-slate-900">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="reset-password"
                    type={showResetPassword ? 'text' : 'password'}
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowResetPassword((value) => !value)}
                    variant="ghost"
                    size="icon-sm"
                    className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                    aria-label={showResetPassword ? 'Hide new password' : 'Show new password'}
                  >
                    {showResetPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="reset-confirm-password" className="block text-left text-[13px] font-medium text-slate-900">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="reset-confirm-password"
                    type={showResetConfirmPassword ? 'text' : 'password'}
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowResetConfirmPassword((value) => !value)}
                    variant="ghost"
                    size="icon-sm"
                    className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                    aria-label={showResetConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showResetConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-2 flex h-11 w-full items-center justify-between rounded-full bg-[#035096] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#024078]"
              >
                <span>Submit</span>
                <svg
                  viewBox="0 0 28 24"
                  aria-hidden="true"
                  className="h-5 w-10 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h22" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16 4 8 8-8 8" />
                </svg>
              </Button>
            </form>
          )}

          {authView === 'success' && (
            <div className="mx-auto mt-5 w-full max-w-[460px]">
              <div className="rounded-[18px] bg-[#035096] px-6 py-10 text-center text-white sm:px-10 sm:py-12">
                <img
                  src="/icons/success.png"
                  alt=""
                  aria-hidden="true"
                  className="mx-auto h-28 w-28 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
                />

                <h3 className="mt-3 text-4xl font-bold tracking-tight">Successful</h3>
                <p className="mt-3 text-base font-medium text-white/95">
                  Your password reset has been successfully verified.
                </p>

                <Button
                  type="button"
                  onClick={handleGoToLogin}
                  className="mx-auto mt-8 flex h-12 min-w-[220px] items-center justify-between rounded-full bg-white px-6 text-base font-semibold text-slate-900 shadow-none hover:bg-slate-100"
                >
                  <span>Go to login</span>
                  <svg
                    viewBox="0 0 28 24"
                    aria-hidden="true"
                    className="h-5 w-10 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h22" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16 4 8 8-8 8" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
