import React from 'react';

const services = [
  'Legal Opinion',
  'Legal Agreement',
  'Rental Agreement',
  'Home Interiors',
  'Packers & Movers',
];

const primeProperties = [
  'Preferred Agents',
  'New Projects',
];

const locations = [
  'Sangareddy',
  'Yadadri Bhuvanagiri',
  'Mahabubnagar',
  'Ranga Reddy',
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181A20] font-sans text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="space-y-10">
            <img src="/images/main-logo-2.png" alt="Gummaam" className="h-11 w-auto" />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[14px] font-normal text-white/55">Contact</p>
                <a href="tel:+919966099898" className="mt-2 block text-[15px] font-semibold text-white">
                  +91 9966099898
                </a>
              </div>
              <div>
                <p className="text-[14px] font-normal text-white/55">Email</p>
                <a href="mailto:sales.gummaam@gmail.com" className="mt-2 block text-[15px] font-semibold text-white break-all">
                  sales.gummaam@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-white">Apps</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex min-w-[176px] items-center gap-3 rounded-2xl bg-white/6 px-4 py-3 transition hover:bg-white/10"
                >
                  <img src="/icons/apple.png" alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                  <div>
                    <p className="text-[14px] font-normal text-white/60">Download on the</p>
                    <p className="text-[15px] font-semibold leading-none text-white">Apple Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex min-w-[176px] items-center gap-3 rounded-2xl bg-white/6 px-4 py-3 transition hover:bg-white/10"
                >
                  <img src="/icons/google-play.png" alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                  <div>
                    <p className="text-[14px] font-normal text-white/60">Get in on</p>
                    <p className="text-[15px] font-semibold leading-none text-white">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-white">Follow us on social media</h3>
              <div className="mt-5 flex items-center gap-5">
                <a href="#" aria-label="Google" className="transition hover:opacity-70">
                  <img src="/icons/google-white.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                </a>
                <a href="#" aria-label="Facebook" className="transition hover:opacity-70">
                  <img src="/icons/fb-white.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                </a>
                <a href="#" aria-label="Instagram" className="transition hover:opacity-70">
                  <img src="/icons/instagram-white.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Keep Yourself Up to Date</h3>
              <form className="mt-5 flex flex-col gap-3 rounded-2xl bg-white/8 p-2 sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="h-14 flex-1 rounded-xl border-0 bg-transparent px-5 text-[14px] font-normal text-white outline-none placeholder:text-white/55"
                />
                <button
                  type="button"
                  className="h-12 rounded-xl px-5 text-[15px] font-semibold text-white transition hover:bg-white/8"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <h3 className="text-[15px] font-semibold text-white">Our Services</h3>
                <ul className="mt-5 space-y-4">
                  {services.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[14px] font-normal text-white/62 underline underline-offset-3 transition hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[15px] font-semibold text-white">Top Prime Properties</h3>
                <ul className="mt-5 space-y-7">
                  {primeProperties.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[15px] font-semibold text-white transition hover:text-white/75">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="max-w-[180px] text-[15px] font-semibold leading-snug text-white">
                  Find Properties By Locations
                </h3>
                <ul className="mt-5 space-y-4">
                  {locations.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[14px] font-normal text-white/62 underline underline-offset-3 transition hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
