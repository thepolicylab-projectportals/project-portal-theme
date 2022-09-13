import React from "react"
import { BackIcon, ForwardIcon, DevelopmentBanner, ProjectStatus } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const Index = () => {
return (
  <>
    <DevelopmentBanner />
    <BackIcon />
    <ForwardIcon />
    <ProjectStatus status="open" />
    <ProjectStatus status="ongoing" />
    <ProjectStatus status="completed" />
  </>
);
};

export default Index;



