import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-surface shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Music Score App
        </Link>
        <nav>
          <Link href="/" className="text-on-surface hover:text-primary px-4">
            Home
          </Link>
          <Link href="/about" className="text-on-surface hover:text-primary px-4">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;