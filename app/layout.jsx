import Navigation from "./Components/Navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <header className=" px-10 shadow-lg"><Navigation/></header>
        <main className="container mx-auto min-h-96 py-5 px-10">{children}</main>
        
        <footer className="py-5 text-center"> <p>Copyright &copy; {new Date().getFullYear()}</p> </footer>
      </body>
    </html>
  );
}
