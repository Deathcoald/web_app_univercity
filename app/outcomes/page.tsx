import Image from "next/image";
import SideNav from "@/app/ui/nav";
import Form from "@/app/ui/form";

export default function Home() {
  const options = [
    { value: "present", label: "Подарок" },
    { value: "salary", label: "Зарплата" },
    { value: "percent", label: "Проценты в банке" },
    { value: "etc", label: "Другое" },
  ];

  return (
    <div>
      <SideNav/>
      <Form type="outcomes" options={options}/>
    </div>
  );
}
