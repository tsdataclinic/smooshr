import React from "react";
import {AboutPage as DCAbout, DataClinicSection, ContributeSection, ProjectInfoSection, Body, NavBarButton} from "@dataclinic/dataclinic"
export default function AboutPage() {
    return (
            <DCAbout>

             <ProjectInfoSection 
             appName={"smooshr"} 
             appSubHeading={"smoosh those messy datasets"}
             appDescription = {"Introducing smooshr, a quick and friendly way to clean messy datasets."}
             >
                <Body>
                    Datasets can be messy and as data scientists, data
                    journalists, civic technologists or just the curious people,
                    we spend a lot of our time trying to clean it up. That's why
                    we built smooshr, a browser based tool that aids you in
                    producing code that can quickly clean up unruly datasets.
                </Body>

                <Body>
                    Our first release focuses on entity consolidation tasks but
                    we have plans to extend this to other forms of data cleaning
                    in the near future.
                </Body>
            </ProjectInfoSection>
            <DataClinicSection/>

            <ContributeSection 
                appName={"smooshr"}
                github={"https://github.com/tsdataclinic/smooshr"}
            />
        </DCAbout>
    );
}
