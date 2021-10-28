import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadModal from "./components/UploadModal";
import ProjectModal from "./components/ProjectModal";
import LoadProjectModal from "./components/LoadProjectModal";
import GHPagesRedirect from "./components/GHPagesRedirect";
import ShowApplyMappingsModal from "./components/ApplyMappingsModal";
import CodeExportModal from "./components/CodeExportModal";
import DatasetPage from "./pages/DatasetPage";
import ColumnPage from "./pages/ColumnPage";
import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import {NavBar,FooterArea,MainArea,NavArea,ResponsiveNavCenterFooterLayout, TSLinksBar,NavBarButton} from "@dataclinic/dataclinic"
import "typeface-lato";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.scss";
import { faProjectDiagram, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="App">
                <ResponsiveNavCenterFooterLayout>
                    <NavArea appName='smooshr'>
                        <NavBar>
                            {/* <NavBarButton
                            name={"Projects"}
                            icon={faProjectDiagram}
                            />
                            <NavBarButton
                            name={"About"}
                            icon={faInfoCircle}
                            /> */}
                        </NavBar>
                    </NavArea>
                    <MainArea>
                        <div className="main"> <Route
                                path="/project/:projectID/dataset/:datasetID"
                                exact={true}
                                component={DatasetPage}
                            />
                            <Route
                                path="/project/:projectID/column/:columnID"
                                exact={true}
                                component={ColumnPage}
                            />
                            <Route
                                path="/project/:projectID"
                                exact={true}
                                component={ProjectPage}
                            />
                            <Route path="/about" exact={true} component={AboutPage} />
                            <Route path="/" exact={true} component={WelcomePage} />
                        </div>
                    </MainArea>
                   <FooterArea>
                       <TSLinksBar/>
                   </FooterArea> 
                </ResponsiveNavCenterFooterLayout>
                <Footer />

                <Route path="/" component={Header} />

                <Route path="/new_project" component={ProjectModal} />
                <Route path="/load_project" component={LoadProjectModal} />

                <Route
                    path="/project/:projectID/export"
                    component={CodeExportModal}
                />
                <Route
                    path="/project/:projectID/add_datasets"
                    component={UploadModal}
                />

                <Route
                    path="/dataset/:datasetID/apply"
                    component={ShowApplyMappingsModal}
                />
            </div>
        </Router>
    );
}

export default App;
