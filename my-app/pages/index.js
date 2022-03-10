import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import Logo from "../public/logo.png";
import { CardList } from "../components/CardList";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WilderForm } from "../components/WilderForm";

const Home = () => {
  return (
    <>
      <Header />
      <WilderForm />
      <CardList />
      <Footer />
    </>
  );
};

export default Home;
