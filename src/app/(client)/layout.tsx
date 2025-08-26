import Nav from "@/components/client/shared/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <div className=" bg-[#fafbfc] dark:bg-secondary ">
        <Nav />
        <div className=" ">{children}</div>
      </div>
    </main>
  );
}
