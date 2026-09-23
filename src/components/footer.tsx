import Container from "@/components/ui/container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/70 w-full border-t">
      <Container>
        <div className="text-muted-foreground flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 text-[11px] leading-relaxed sm:text-xs">
          <p>kxviel @ Kaiserslautern, Germany</p>
          <p>Copyright &copy; {year}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
