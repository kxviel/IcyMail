import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { SearchHistory } from "@/components/searchHistory";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-border/70 w-full border-b">
      <Container>
        <div className="flex min-h-20 items-center gap-3 py-3 sm:gap-5">
          <Link
            to="/"
            aria-label="Crystal Index home"
            className="focus-visible:outline-ring flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-4"
          >
            <img
              src="/favicon-32.png"
              srcSet="/favicon-32.png 1x, /favicon-96.png 2x"
              alt=""
              className="size-10 shrink-0 object-contain"
            />
            <span className="text-sm font-medium tracking-[0.08em] sm:text-lg">CRYSTAL INDEX</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="text-muted-foreground ml-auto flex items-center text-sm"
          >
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(true)}
            >
              History
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </Container>

      <SearchHistory open={isOpen} onOpenChange={setIsOpen} />
    </header>
  );
};

export default Header;
