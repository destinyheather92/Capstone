import Header from "../../Components/Header/Header";

import Hero from "../../Components/HeroSections/Hero/Hero";
import About from "../../Components/HeroSections/About/About";
import Statistics from "../../Components/HeroSections/Statistics/Statistics";
import Skills from "../../Components/HeroSections/Skills/Skills";
import Pricing from "../../Components/HeroSections/Pricing/Pricing";
import Contact from "../../Components/HeroSections/Contact/Contact";
import Footer from "../../Components/Footer/Footer";

import Spinner from "react-bootstrap/Spinner";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  // const { user, setUser } = useContext(ConstructionAppContext);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // console.log({ username, password });
  //   axios
  //     .post(
  //       "http://localhost:8080/login",
  //       { username, password },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       setUser(res.data.user);
  //       navigate("/job");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError(true);
  //     });
  // };

  // const handleLogout = () => {
  //   axios
  //     .get("http://localhost:8080/logout", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //       navigate("/");
  //     })
  //     .catch((err) => console.error(err));
  //   setUser({ username: "", firstName: "", lastName: "" });
  // };

  return (
    <>
      {/* hero has a register click which will allow a user to register */}

      <Hero registerClick={() => navigate("/register")} />
      <Header title={"About Us"} />
      <About />
      <Statistics />
      <Skills />
      <Pricing />
      <Contact />
      <Footer text="Powered by DMProductions&trade;" />
    </>
  );
}
