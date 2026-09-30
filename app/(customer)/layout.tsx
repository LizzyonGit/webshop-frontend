import NavigationBar from '@/components/navigation-bar';
import Footer from '@/components/footer';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  );
}