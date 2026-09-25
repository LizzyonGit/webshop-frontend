import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 py-12">
      <nav aria-label="Footer navigation" className="grid gap-8 md:grid-cols-4">
        <div>
          <p className="font-semibold">SKY MARKET</p>
          <Link href="/about" className="mt-2 block text-sm text-muted-foreground hover:text-foreground">
            About us
          </Link>
          <address className="mt-4 text-sm not-italic text-muted-foreground">
        
            Saturnusgatan 5, 123 45 Stockholm,
            <br />
             Sweden
          </address>
        </div>

        <div>
          <p className="font-semibold">CUSTOMER SERVICE</p>
          <Link href="/contact" className="mt-2 block text-sm text-muted-foreground hover:text-foreground">
            Contact us
          </Link>
        </div>

        <div>
          <p className="font-semibold">INFORMATION</p>
          <Link href="/shipping" className="mt-2 block text-sm text-muted-foreground hover:text-foreground">
            Shipping
          </Link>
          <Link href="/returns" className="mt-2 block text-sm text-muted-foreground hover:text-foreground">
            Returns
          </Link>
        </div>

        <div>
            <p className="font-semibold">FOLLOW US</p>
             <a href="https://instagram.com/skymarket" target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-muted-foreground hover:text-foreground">
              Instagram
            </a>
            <a href="https://facebook.com/skymarket" target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-muted-foreground hover:text-foreground">
              Facebook
            </a>
           
        </div>
        
      </nav>

      <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">© 2026 Sky Market</p>

      </div>
      </div>
    
    </footer>
  );
}
