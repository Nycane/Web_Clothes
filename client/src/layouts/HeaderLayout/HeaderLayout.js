import Header from "../components/Header";
import Footer from "../components/Footer";
function HeaderLayout({children}) {
    return (  
      <>
            <Header bg={true}></Header>
                    {children}
            <Footer></Footer>
      </>
    )
}

export default HeaderLayout;