import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLogout, useUser } from "@/services/user";
import { useNavPage } from "@/store/nav";
import { DoorOpen, MenuIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export function SideBar() {
  const { data: user } = useUser();
  const logout = useLogout();
  const location = useLocation();
  const pathname = location.pathname;
  const { page, changePage } = useNavPage();
  const navigate = useNavigate();

  const nav = [
    { name: "Produtos", href: "/list-products" },
    { name: "Usuários", href: "/users" },
    { name: "Novo produto", href: "/new-product" },
  ];

  useEffect(() => {
    const currentIndex = nav.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) changePage(currentIndex);
  }, [pathname]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <nav className="hidden h-full max-w-[320px] min-w-[280px] flex-col justify-between border-r border-zinc-600 px-6 pt-14 pb-8 md:flex">
        <div className="flex flex-col space-y-16">
          <Link to={"/list-products"}>
            <h1 className="text-3xl font-bold text-lime-500">Logs Up</h1>
          </Link>

          <div className="text-muted-foreground flex flex-col space-y-6">
            {nav.map((item, i) => (
              <Link key={i} to={item.href}>
                <button
                  className={`w-full cursor-pointer px-2 py-2 text-start text-xl ${page === i && "rounded-md border-2 border-neutral-700/80 bg-zinc-800 text-white"}`}
                  onClick={() => changePage(i)}
                >
                  {item.name}
                </button>
                {i === 2 && (
                  <div className="mt-4 h-[1px] w-full bg-neutral-700" />
                )}
              </Link>
            ))}
            <p className="text-center text-xl">Bem Vindo</p>

            <p className="font-bold text-zinc-300">{user?.name}</p>
            <p className="font-bold text-zinc-400">Cargo: {user?.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center space-x-2 transition-all duration-150 ease-in hover:-translate-y-1"
        >
          <DoorOpen />
          <p>Sair</p>
        </button>
      </nav>
      <Sheet>
        <SheetTrigger className="absolute cursor-pointer pt-10 pl-8 transition duration-150 ease-in hover:scale-105 md:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between pb-10"
        >
          <SheetHeader>
            <SheetTitle>
              <Link to={"/list-products"}>
                <h1 className="text-3xl font-bold text-lime-500">Logs Up</h1>
              </Link>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="text-muted-foreground mt-6 flex flex-col space-y-4 pr-10">
              {nav.map((item, i) => (
                <Link key={i} to={item.href}>
                  <button
                    className={`w-full cursor-pointer px-2 py-2 text-start text-xl ${page === i && "rounded-md border-2 border-neutral-700/80 bg-zinc-800 text-white"}`}
                    onClick={() => changePage(i)}
                  >
                    {item.name}
                  </button>
                  {i === 2 && (
                    <div className="mt-4 h-[1px] w-full bg-neutral-700" />
                  )}
                </Link>
              ))}
              <p className="text-center text-xl">Bem Vindo</p>
              <div className="flex space-x-2">
                <p className="font-bold text-zinc-300">{user?.name}</p>
                <span>-</span>
                <p className="font-bold text-zinc-400">{user?.role}</p>
              </div>
            </div>
          </SheetHeader>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center space-x-2 pl-4 text-xl transition-all duration-150 ease-in hover:-translate-y-1"
          >
            <DoorOpen />
            <p>Sair</p>
          </button>
        </SheetContent>
      </Sheet>
    </>
  );
}
