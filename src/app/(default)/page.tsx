import Header from "@/components/Header";
import Logo from "@/components/Logo";
import VerticalLayout from "@/components/VerticalLayout";
import NavigationSection from "./_components/NavigationSection";

export default function Default() {
  return (
    <VerticalLayout screenHeight>
      <Header>
        <Logo />
        <NavigationSection />
      </Header>
    </VerticalLayout>
  )
}