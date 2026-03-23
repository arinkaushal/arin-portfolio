const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-border py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="font-mono text-lg font-bold tracking-widest">
            <span className="text-neon">&lt;</span>
            <span className="text-white">ARIN</span>
            <span className="text-neon">/&gt;</span>
          </a>

          {/* Nav links */}
          <ul className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="font-mono text-xs text-gray-500 hover:text-neon transition-colors duration-300 tracking-widest uppercase"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="font-mono text-xs text-gray-600">
            &copy; {currentYear} <span className="text-neon">Arin</span>. All rights reserved.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="mt-6 text-center">
          <p className="font-mono text-xs text-gray-700">
            Built with <span className="text-neon">♥</span> using React · Node.js · MongoDB · Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
