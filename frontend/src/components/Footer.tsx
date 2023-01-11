import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-emerald-800 h-28 flex flex-col justify-center items-center text-slate-200 px-40 gap-3">
      <div className="flex gap-2">
        <a href="https://github.com/yarinmzrc" target="_blank" rel="noreferrer">
          <FaGithubSquare size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/yarinmzrc/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
      <p>Yarin Mizrachi © 2023</p>
    </div>
  );
};
