import Banner from "../components/Banner/Banner";
import Mentor from "../components/Mentor/Mentor";
import RootLayout from "../layouts/BasicLayout";
import  Companies  from '../components/Companies/Companies';
import  Tabs  from '../components/Courses/Courses';
import  Students  from '../components/Students/Students';


export default function Home() {
  return (
    <RootLayout>
    <main>
      <Banner />
      <Companies />
      <Tabs />
      <Mentor />
      <Students />
    </main>
    </RootLayout>
  )
}
