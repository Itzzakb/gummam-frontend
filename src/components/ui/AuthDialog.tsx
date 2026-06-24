import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

type AuthDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const socialButtons = [
  {
    label: 'Google',
    icon: '/icons/google.png',
  },
  {
    label: 'Instagram',
    icon: '/icons/instagram.png',
  },
  {
    label: 'Facebook',
    icon: '/icons/facebook.png',
  },
];

export const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose }) => {
  const { login, authDialogTab } = useAuth();
  const [accountType, setAccountType] = useState<'user' | 'agent'>('user');

  useEffect(() => {
    if (isOpen) {
      setAccountType(authDialogTab);
    }
  }, [isOpen, authDialogTab]);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot-password' | 'otp' | 'reset-password' | 'success' | 'agent-register-success'>('login');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

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

  const resetAuthFlow = () => {
    setAuthView('login');
    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
    setShowResetPassword(false);
    setShowResetConfirmPassword(false);
    setOtp(['', '', '', '']);
  };

  const isAgentRegisterView = accountType === 'agent' && authView === 'register';
  const dialogWidthClass = isAgentRegisterView ? 'max-w-[760px]' : 'max-w-[640px]';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetAuthFlow();
          onClose();
        }
      }}
    >
      <DialogContent className={`max-h-[88vh] overflow-visible bg-white px-5 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-6 ${dialogWidthClass}`}>
        <DialogClose
          className="absolute top-2 left-full ml-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/20"
          aria-label="Close login dialog"
        >
          <X className="h-5 w-5" />
        </DialogClose>

        <div className="max-h-[calc(88vh-52px)] overflow-hidden rounded-[20px]">
        <div className="max-h-[calc(88vh-52px)] overflow-y-auto overflow-x-hidden pr-3 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          <div className="flex flex-col gap-5 pb-8">
            <div className="flex-1">
              <div className="mb-5 flex items-start justify-between gap-4">
                <img src="/images/main-logo-2.png" alt="Gummaam" className="h-8 w-auto" />

                <Tabs
                  value={accountType}
                  onValueChange={(value) => setAccountType(value as 'user' | 'agent')}
                >
                  <TabsList>
                    <TabsTrigger value="user">User</TabsTrigger>
                    <TabsTrigger value="agent">Agent</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="mx-auto max-w-[320px] text-center lg:max-w-[340px]">
                <DialogTitle
                  id="auth-dialog-title"
                  className="text-[2.35rem] font-bold tracking-tight text-[#0B56A2] sm:text-[2.9rem]"
                >
                  {authView === 'login' && 'LOG IN'}
                  {authView === 'register' && 'REGISTRATION'}
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
                  {authView === 'agent-register-success' && ' '}
                  {authView === 'success' && ' '}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm font-medium text-slate-900">
                  {authView === 'login' && 'Hi, Welcome Back'}
                  {authView === 'register' && (accountType === 'agent' ? 'Create your agent account' : 'Create your user account')}
                  {authView === 'forgot-password' && 'Recover access to your user account'}
                  {authView === 'otp' && (
                    <>
                      An 4 digit code has been sent to
                      <br />
                      <span className="font-semibold text-[#0B56A2]">Email address or +91 **********</span>
                    </>
                  )}
                  {authView === 'reset-password' && 'Create a new password for your user account'}
                  {authView === 'agent-register-success' && ' '}
                  {authView === 'success' && ' '}
                </DialogDescription>
              </div>

              {authView === 'login' ? (
                <>
                  <form className="mx-auto mt-7 max-w-[320px] space-y-4 lg:max-w-[340px]">
                    <div className="space-y-2">
                      <label htmlFor="auth-email" className="block text-left text-[13px] font-medium text-slate-900">
                        Email/Mobile no.
                      </label>
                      <Input
                        id="auth-email"
                        type="text"
                        placeholder="Enter email/mobile no."
                        className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="auth-password" className="block text-left text-[13px] font-medium text-slate-900">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="auth-password"
                          type={showLoginPassword ? 'text' : 'password'}
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
                        onClick={() => setAuthView('forgot-password')}
                        className="h-auto px-0 text-xs font-semibold text-[#0B56A2] hover:text-[#083D76]"
                      >
                        Forgot password?
                      </Button>
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        login(accountType);
                        onClose();
                      }}
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

                  <div className="mx-auto mt-6 max-w-[320px] lg:max-w-[340px]">
                    {accountType !== 'agent' && (
                      <>
                        <div className="flex items-center gap-3 text-xs text-slate-700">
                          <div className="h-px flex-1 bg-[#0D76D8]" />
                          <span className="whitespace-nowrap font-medium">Or Log In with</span>
                          <div className="h-px flex-1 bg-[#0D76D8]" />
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-3">
                          {socialButtons.map((button) => (
                            <button
                              key={button.label}
                              type="button"
                              aria-label={`Continue with ${button.label}`}
                              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,23,42,0.12)]"
                            >
                              <img
                                src={button.icon.startsWith('/') ? button.icon : `/${button.icon}`}
                                alt={button.label}
                                className="h-6 w-6 object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    <p className={`${accountType !== 'agent' ? 'mt-6' : 'mt-2'} text-center text-sm text-slate-800`}>
                      Don&apos;t have account?{' '}
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setAuthView('register')}
                        className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                      >
                        Sign Up
                      </Button>
                    </p>
                  </div>
                </>
              ) : authView === 'register' ? (
                accountType === 'user' ? (
                <div className="mx-auto mt-7 max-w-[460px]">
                  <form className="grid gap-x-5 gap-y-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="register-name" className="block text-left text-[13px] font-medium text-slate-900">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="First Name"
                        className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-left text-[13px] font-medium text-slate-900">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <Select defaultValue="select">
                        <SelectTrigger className="!h-11 w-full rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="register-email" className="block text-left text-[13px] font-medium text-slate-900">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Email"
                        className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="register-mobile" className="block text-left text-[13px] font-medium text-slate-900">
                        Mobile No. <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="register-mobile"
                        type="text"
                        placeholder="Enter Mobile No."
                        className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="register-password" className="block text-left text-[13px] font-medium text-slate-900">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showRegisterPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                        <Button
                          type="button"
                          onClick={() => setShowRegisterPassword((value) => !value)}
                          variant="ghost"
                          size="icon-sm"
                          className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                          aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}
                        >
                          {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="register-confirm-password" className="block text-left text-[13px] font-medium text-slate-900">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                        <Button
                          type="button"
                          onClick={() => setShowConfirmPassword((value) => !value)}
                          variant="ghost"
                          size="icon-sm"
                          className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                          aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>

                    <label className="col-span-full flex items-center gap-2 text-sm text-slate-900">
                      <input type="checkbox" className="h-5 w-5 rounded border border-slate-300 accent-[#035096]" />
                      <span>Terms &amp; Conditions <span className="text-red-500">*</span></span>
                    </label>

                    <label className="col-span-full flex items-center gap-2 text-sm text-slate-900">
                      <input type="checkbox" className="h-5 w-5 rounded border border-slate-300 accent-[#035096]" />
                      <span>Notification <span className="text-red-500">*</span></span>
                    </label>
                  </form>

                  <div className="mx-auto mt-4 max-w-[320px]">
                    <Button
                      type="button"
                      onClick={() => {
                        login(accountType);
                        onClose();
                      }}
                      className="flex h-11 w-full items-center justify-between rounded-full bg-[#035096] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#024078]"
                    >
                      <span>Register Now</span>
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

                    <p className="mt-4 text-center text-sm text-slate-800">
                      Already have an account?{' '}
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setAuthView('login')}
                        className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                      >
                        Login
                      </Button>
                    </p>
                  </div>
                </div>
                ) : (
                  <div className="mx-auto mt-7 max-w-[620px]">
                    <form className="grid gap-x-4 gap-y-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="agent-name" className="block text-left text-[13px] font-medium text-slate-900">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="agent-name"
                          type="text"
                          placeholder="Enter your name"
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-left text-[13px] font-medium text-slate-900">
                          I am <span className="text-red-500">*</span>
                        </label>
                        <Select defaultValue="select">
                          <SelectTrigger className="!h-11 w-full rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="builder">Builder</SelectItem>
                            <SelectItem value="broker">Broker</SelectItem>
                            <SelectItem value="agent">Agent</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-email" className="block text-left text-[13px] font-medium text-slate-900">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="agent-email"
                          type="email"
                          placeholder="Email"
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-mobile" className="block text-left text-[13px] font-medium text-slate-900">
                          Mobile No. <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="agent-mobile"
                          type="text"
                          placeholder="Enter Mobile No."
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-password" className="block text-left text-[13px] font-medium text-slate-900">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            id="agent-password"
                            type={showRegisterPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                          />
                          <Button
                            type="button"
                            onClick={() => setShowRegisterPassword((value) => !value)}
                            variant="ghost"
                            size="icon-sm"
                            className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                            aria-label={showRegisterPassword ? 'Hide password' : 'Show password'}
                          >
                            {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-confirm-password" className="block text-left text-[13px] font-medium text-slate-900">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            id="agent-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="h-11 rounded-full border-[#0D76D8] px-5 pr-12 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                          />
                          <Button
                            type="button"
                            onClick={() => setShowConfirmPassword((value) => !value)}
                            variant="ghost"
                            size="icon-sm"
                            className="absolute inset-y-0 right-3 my-auto rounded-full text-slate-400 hover:bg-transparent hover:text-slate-700"
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-company" className="block text-left text-[13px] font-medium text-slate-900">
                          Company Name
                        </label>
                        <Input
                          id="agent-company"
                          type="text"
                          placeholder="Enter your company name"
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-experience" className="block text-left text-[13px] font-medium text-slate-900">
                          Experience
                        </label>
                        <Input
                          id="agent-experience"
                          type="text"
                          placeholder="Enter your experience"
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-left text-[13px] font-medium text-slate-900">
                          District <span className="text-red-500">*</span>
                        </label>
                        <Select defaultValue="district">
                          <SelectTrigger className="!h-11 w-full rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="district">Select district</SelectItem>
                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                            <SelectItem value="warangal">Warangal</SelectItem>
                            <SelectItem value="karimnagar">Karimnagar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-left text-[13px] font-medium text-slate-900">
                          Mandal <span className="text-red-500">*</span>
                        </label>
                        <Select defaultValue="mandal">
                          <SelectTrigger className="!h-11 w-full rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mandal">Select</SelectItem>
                            <SelectItem value="uppal">Uppal</SelectItem>
                            <SelectItem value="gachibowli">Gachibowli</SelectItem>
                            <SelectItem value="kukatpally">Kukatpally</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-city" className="block text-left text-[13px] font-medium text-slate-900">
                          City <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="agent-city"
                          type="text"
                          placeholder="Enter your city"
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="agent-sector" className="block text-left text-[13px] font-medium text-slate-900">
                          Sector Deals In
                        </label>
                        <Input
                          id="agent-sector"
                          type="text"
                          placeholder="Rent/lease, Pre-Launch, Resale..."
                          className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="agent-company-details" className="block text-left text-[13px] font-medium text-slate-900">
                          About Company
                        </label>
                        <textarea
                          id="agent-company-details"
                          placeholder="Enter your company details"
                          className="min-h-20 w-full rounded-[20px] border border-[#0D76D8] px-5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0B56A2] focus:ring-2 focus:ring-[#0B56A2]/15"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-left text-[13px] font-medium text-slate-900">
                          Company Images/video
                        </label>
                        <div className="flex min-h-18 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#0D76D8] px-4 py-4 text-center">
                          <img src="/icons/solar_user-broken.png" alt="" aria-hidden="true" className="mb-2 h-6 w-6 opacity-60" />
                          <Button type="button" className="h-8 rounded-full bg-[#035096] px-4 text-xs text-white shadow-none hover:bg-[#024078]">
                            Choose File
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-left text-[13px] font-medium text-slate-900">
                          Profile Image
                        </label>
                        <div className="flex min-h-18 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#0D76D8] px-4 py-4 text-center">
                          <img src="/icons/solar_user-broken.png" alt="" aria-hidden="true" className="mb-2 h-6 w-6 opacity-60" />
                          <Button type="button" className="h-8 rounded-full bg-[#035096] px-4 text-xs text-white shadow-none hover:bg-[#024078]">
                            Choose File
                          </Button>
                        </div>
                      </div>

                      <label className="md:col-span-2 flex items-center gap-2 text-sm text-slate-900">
                        <input type="checkbox" className="h-5 w-5 rounded border border-slate-300 accent-[#035096]" />
                        <span>Terms &amp; Conditions <span className="text-red-500">*</span></span>
                      </label>
                    </form>

                    <div className="mx-auto mt-6 max-w-[340px]">
                      <Button
                        type="button"
                        onClick={() => setAuthView('agent-register-success')}
                        className="flex h-11 w-full items-center justify-between rounded-full bg-[#035096] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#024078]"
                      >
                        <span>Register Now</span>
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

                      <p className="mt-6 text-center text-sm text-slate-800">
                        Already have an account?{' '}
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => setAuthView('login')}
                          className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                        >
                          Login
                        </Button>
                      </p>
                    </div>
                  </div>
                )
              ) : authView === 'forgot-password' ? (
                <div className="mx-auto mt-7 max-w-[340px]">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="forgot-email" className="block text-left text-[13px] font-medium text-slate-900">
                        Email/Mobile no.
                      </label>
                      <Input
                        id="forgot-email"
                        type="text"
                        placeholder="Enter email/mobile no."
                        className="h-11 rounded-full border-[#0D76D8] px-5 text-sm text-slate-700 shadow-none focus-visible:border-[#0B56A2] focus-visible:ring-[#0B56A2]/15"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => setAuthView('otp')}
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
                        onClick={() => setAuthView('login')}
                        className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                      >
                        Login
                      </Button>
                    </p>
                  </form>
                </div>
              ) : authView === 'otp' ? (
                <div className="mx-auto mt-7 max-w-[340px]">
                  <div className="space-y-6">
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
                      Don&apos;t receive OTP ?{' '}
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
                      onClick={() => setAuthView('reset-password')}
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
                        onClick={() => setAuthView('forgot-password')}
                        className="h-auto px-0 font-semibold text-[#0B56A2] hover:text-[#083D76]"
                      >
                        Go back
                      </Button>
                    </p>
                  </div>
                </div>
              ) : authView === 'reset-password' ? (
                <div className="mx-auto mt-7 max-w-[340px]">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="reset-password" className="block text-left text-[13px] font-medium text-slate-900">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          id="reset-password"
                          type={showResetPassword ? 'text' : 'password'}
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
                      type="button"
                      onClick={() => setAuthView('success')}
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
                </div>
              ) : authView === 'success' ? (
                <div className="mx-auto mt-5 max-w-[460px]">
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
                      onClick={() => setAuthView('login')}
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
              ) : (
                <div className="mx-auto mt-5 max-w-[460px]">
                  <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
                    <img
                      src="/icons/success-green.png"
                      alt=""
                      aria-hidden="true"
                      className="mx-auto h-28 w-28 object-contain"
                    />

                    <h3 className="mt-3 text-[2.1rem] font-bold tracking-tight text-[#0B56A2]">
                      Details Submitted
                    </h3>
                    <p className="mx-auto mt-4 max-w-[430px] text-lg leading-8 text-[#7A7A7A]">
                      The Gummaam team will verify the details and provide an update within <span className="font-bold text-[#3A3A3A]">48 working hours.</span> After that, you can upload your property to the Gummaam platform.
                    </p>

                    <Button
                      type="button"
                      onClick={() => {
                        resetAuthFlow();
                        onClose();
                      }}
                      className="mx-auto mt-10 flex h-12 min-w-[280px] items-center justify-between rounded-full bg-[#035096] px-6 text-base font-semibold text-white shadow-none hover:bg-[#024078]"
                    >
                      <span>Back to Home</span>
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
        </div>

        <img
          src="/images/left-parallex.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[12.5rem] left-0 hidden w-28 md:block"
        />

        <img
          src="/images/right-parallex.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-10 hidden w-52 md:block"
        />
      </DialogContent>
    </Dialog>
  );
};
