import Container from "@/components/Container";
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import ThemeSelector from "@/components/ThemeSelector";
import UserSideMenu from "@/components/UserSideMenu";

export default function PreferencesPage() {
  return (
    <>
      <Header />
      <Container className="pl-0 lg:pl-0 py-0 lg:py-0">
        <UserSideMenu />

        <MainContentWrapper>
          <h1>Preferencias</h1>

          <p className="text-xl font-bold mb-4">Tema</p>

          <ThemeSelector />
        </MainContentWrapper>
      </Container>
    </>
  );
}
